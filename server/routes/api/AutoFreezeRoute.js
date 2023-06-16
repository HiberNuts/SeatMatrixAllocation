const express = require("express");
const FreezeRouter = express.Router();
const jwt = require("jsonwebtoken");
const secret = "6$Sz249eF18@MKy1N";
var { expressjwt: ejwt } = require("express-jwt");
var multer = require("multer");
const s3 = require("../../config/aws");
// Load User model
const users = require("../../db/models/Users");
const nodemailer = require("nodemailer");

const courseRank = require("./CourseRank.js");

const BUCKET = "seatmartix";

const GOVTSeats = {
  "CENTRAL GOVT": 0.5,
  CHRISTIAN: 0.5,
  GOVT: 1,
  "GOVT AIDED": 0.7,
  HINDI: 0.5,
  JAIN: 0.5,
  MALAYALAM: 0.5,
  "MALAYALAM LINGUISTIC": 0.5,
  MIN: 0.5,
  MUSLIM: 0.5,
  NM: 0.65,
  SOWRASHTRA: 0.5,
  TELUGU: 0.5,
  UNIV: 0.7,
  IRTT: 0.65,
  SS: 0.7,
};

FreezeRouter.post("/autofreeze", async (req, res) => {
  let { CourseDetails, Category, ccode } = await users.findOne(
    { ccode: "0000" },
    { CourseDetails: 1, Category: 1, ccode: 1 }
  );

  const seatsToAdd = () => {
    let intake = 0;
    let GOVT = 0;

    CourseDetails.forEach((element) => {
      if (element.Quota !== 1) {
        intake += element.intake;
        GOVT += element.Govt;
      }
    });
    if (GOVTSeats[Category] * intake - GOVT < 1) return 0;
    else if ((GOVTSeats[Category] * intake - GOVT) % 1 > 0.9)
      return Math.floor(GOVTSeats[Category] * intake - GOVT) + 1;
    else return Math.floor(GOVTSeats[Category] * intake - GOVT);
  };

  const onAddSeat = (i) => {
    const course = CourseDetails;
    if (course) {
      course[i]["Govt"] += 1;
      course[i]["Management"] -= 1;
      course[i]["SWS"] += 1;
      course[i]["Added"] += 1;
    }
    CourseDetails = course;
  };
  const getCollegeInfo = () => {
    var ec = [];
    for (let index = 0; index < CourseDetails.length; index++) {
      const element = CourseDetails[index];
      if (element.Quota !== 1 && element.Management > 0) {
        ec.push({ ...element, index: index });
      }
    }
    ec.sort((a, b) => {
      if (a.Pending === b.Pending) {
        return courseRank[ccode]?.indexOf(a.courseCode) - courseRank[ccode]?.indexOf(b.courseCode);
      } else return b.Pending - a.Pending;
    });

    let seat = seatsToAdd();

    let mgmt = 0;
    for (let index = 0; index < ec.length; index++) {
      if (seat === 0) {
        break;
      }
      mgmt += ec[index].Management;
      let indexVal = ec[index].index;

      if (indexVal >= 0) {
        onAddSeat(indexVal);
        seat--;
      }
    }
    if (seat > 0 && mgmt >= seat) {
      getCollegeInfo();
    }

    res.json(CourseDetails);
  };

  getCollegeInfo();
});




module.exports = FreezeRouter;
