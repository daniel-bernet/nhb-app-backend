const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { Account, Group, Band, GroupMember, Type, Answer, Poll, Question, Option, Event, Sentiment, PollQuestionJoin, sequelize } = require("../models");

const router = express.Router();

// Create Group endpoint with multiple initial members
router.post("/create", verifyToken, async (req, res) => {
  const { name, description, accountIds } = req.body;
  const creatorAccountId = req.account.accountId;
  const transaction = await sequelize.transaction();

  try {
    const newGroup = await Group.create({
      Name: name,
      Description: description,
      BandID: 1
    }, { transaction });

    await GroupMember.create({
      GroupID: newGroup.GroupID,
      AccountID: creatorAccountId
    }, { transaction });

    for (const accountId of accountIds) {
      const accountExists = await Account.findByPk(accountId);
      if (!accountExists) {
        throw new Error(`Account ID ${accountId} not found`);
      }
      await GroupMember.create({
        GroupID: newGroup.GroupID,
        AccountID: accountId
      }, { transaction });
    }

    returnGroup = await Group.findByPk(newGroup.GroupID, {
      include: [
        {
          model: Band,
          as: 'band',
          attributes: ['Description']
        },
        {
          model: Account,
          as: 'members',
          attributes: ['AccountID']
        }
      ],
      attributes: ['GroupID', 'Name', 'Description']
    });

    await transaction.commit();
    res.status(201).json({
      message: "Group created successfully with members added",
      group: returnGroup
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
});


// Delete Group endpoint
router.delete("/delete/:groupId", verifyToken, async (req, res) => {
  const { groupId } = req.params;
  const transaction = await sequelize.transaction();
  try {
    const group = await Group.findByPk(groupId, { transaction });
    if (!group) {
      await transaction.rollback();
      return res.status(404).json({ error: "Group not found" });
    }

    await group.destroy({ transaction });

    await transaction.commit();
    res
      .status(200)
      .json({ message: "Group and all related data successfully deleted" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
});

// Get Group Info
router.get("/info/:groupId", verifyToken, async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: Band,
          as: 'band',
          attributes: ['Description']
        },
        {
          model: Account,
          as: 'members',
          attributes: ['AccountID', 'FirstName', 'LastName']
        }
      ],
      attributes: ['GroupID', 'Name', 'Description']
    });
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Group Info
router.patch("/edit/:groupId", verifyToken, async (req, res) => {
  const { groupId } = req.params;
  const { name, description } = req.body;
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    group.Name = name || group.Name;
    group.Description = description || group.Description;
    await group.save();
    res.status(200).json({ message: "Group updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Member to Group
router.post("/add-member", verifyToken, async (req, res) => {
  const { groupId, manipulateAccountId } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const member = await GroupMember.create({
      GroupID: groupId,
      AccountID: manipulateAccountId,
    }, { transaction });

    const option = await Option.findOne({
      where: { Option: 'unanswered' },
      transaction
    });

    const polls = await Poll.findAll({
      where: { GroupID: groupId, IsClosed: false },
      include: [{
        model: Question,
        as: 'questions',
        through: { attributes: [] },
      }],
      transaction
    });

    for (const poll of polls) {
      for (const question of poll.questions) {
        await Answer.create({
          QuestionID: question.QuestionID,
          GroupMemberID: member.GroupMemberID,
          OptionID: option.OptionID,
        }, { transaction });
      }
    }

    await transaction.commit();
    res.status(201).json({
      message: "Member added successfully and default answers set for open polls",
      member,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Failed to add member to group:", error);
    res.status(500).json({ error: error.message });
  }
});

// Remove Member from Group
router.delete("/remove-member", verifyToken, async (req, res) => {
  const { groupId, manipulateAccountId } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const member = await GroupMember.findOne({
      where: {
        GroupID: groupId,
        AccountID: manipulateAccountId,
      },
      transaction,
    });
    if (!member) {
      await transaction.rollback();
      return res.status(404).json({ error: "Member not found" });
    }

    await Answer.destroy({
      where: { GroupMemberID: member.GroupMemberID },
      transaction,
    });

    await member.destroy({ transaction });

    const remainingMembers = await GroupMember.count({
      where: { GroupID: groupId },
      transaction,
    });
    if (remainingMembers === 0) {
      await Event.destroy({ where: { GroupID: groupId }, transaction });
      await Poll.destroy({ where: { GroupID: groupId }, transaction });
      await Group.destroy({ where: { GroupID: groupId }, transaction });
    }

    await transaction.commit();
    const message =
      remainingMembers === 0
        ? "Member removed and group deleted due to no remaining members"
        : "Member removed successfully";
    res.status(200).json({ message });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-feed/:groupId", verifyToken, async (req, res) => {
  console.log("GET /get-feed/:groupId")

  const { groupId } = req.params;
  const accountId = req.account.accountId;
  const start = parseInt(req.query.start) || 0;
  const limit = 20;

  try {
    const isMember = await GroupMember.count({
      where: { GroupID: groupId, AccountID: accountId },
    });

    if (isMember === 0) {
      return res
        .status(403)
        .json({ error: "User is not a member of the group" });
    }

    const eventsPromise = Group.findByPk(groupId, {
      include: {
        model: Event,
        as: "events",
        attributes: [
          "EventID",
          "Title",
          "Description",
          "Location",
          "Date",
          "Duration",
          "createdAt",
          "updatedAt",
          "TypeID",
        ],
        limit: limit,
        offset: start,
        order: [["updatedAt", "DESC"]],
        include: [{ model: Type, as: "eventType", attributes: ["Label"] }],
      },
    });

    const pollsPromise = Group.findByPk(groupId, {
      include: {
        model: Poll,
        as: "polls",
        attributes: [
          "PollID",
          "Title",
          "Description",
          "createdAt",
          "updatedAt",
          "TypeID",
          "IsClosed",
        ],
        limit: limit,
        offset: start,
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: Type, as: "pollType", attributes: ["Label"]
          },
          {
            model: Question,
            as: "questions",
            include: [
              {
                model: Option, as: "options", include: ["sentiment"]
              },
              {
                model: Answer, as: "answers", include: [
                  { model: Option, as: "option", include: ["sentiment"] },
                  {
                    model: GroupMember, as: "groupMember", include: [
                      { model: Account, as: "account", attributes: ["FirstName", "LastName", "AccountID"] },
                    ]
                  },]
              },
            ],
            attributes: ["QuestionID", "Question", "Date", "Description", "Duration"],
          },
        ],
      },
    });

    const [events, polls] = await Promise.all([eventsPromise, pollsPromise]);

    events.events.forEach((event) => (event.dataValues.feedType = "event"));
    polls.polls.forEach((poll) => (poll.dataValues.feedType = "poll"));

    const combinedFeed = [...events.events, ...polls.polls];
    combinedFeed.sort((a, b) => b.updatedAt - a.updatedAt);

    res.status(200).json({
      data: combinedFeed.slice(0, limit),
      message: "Feed fetched successfully",
    });
  } catch (error) {
    console.error("Failed to fetch group feed:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
