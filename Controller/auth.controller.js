const UserModel = require("../Schemas/auth.schema");
const BaseError = require("../Utils/base_error");
const bcryptjs = require("bcryptjs");
const { array } = require("joi");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function register(req, res, next) {
  try {
    const { username, email, password, role } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
    if (foundUser) {
      return next(
        BaseError.BadRequest(
          403,
          "Siz oldin ro'yxatdan o'tgansiz, tizimga kirishingiz mumkin!"
        )
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VERIFIER_EMAIL,
        pass: process.env.VERIFIER_GOOGLE_PASS_KEY,
      },
    });

    const randomCode = Number(
      Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")
    );
    async function verifierEmail() {
      const info = await transporter.sendMail({
        from: `Verifying service of ${process.env.VERIFIER_EMAIL}>`,
        to: email,
        subject: "Verifying email",
        text: "to sign up",
        html: `     <div
      class="main"
      style="
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background-color: rgb(128, 186, 157);
        max-width: 900px;
        margin: 0 auto;
        border-radius: 20px;
        box-shadow: 10px 10px 30px rgb(0, 0, 0);
        height: 500px;
        font-family: Fira Sans;
      "
    >
      <div class="verCode" style="font-size: 33px; font-weight: 700">
        <p>Sizning tasdiqlash kodingiz:</p>
        <p
          style="
            background-color: white;
            width: 300px;
            height: 50px;
            padding-top: 18px;
            margin-left: 120px;
            border-radius: 10px;
          "
        >${randomCode}</p>
      </div>
    </div>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    const encodedPassword = await bcryptjs.hash(password, 12);
    const newUser = new UserModel({
      username: username,
      email: email,
      password: encodedPassword,
      verification_code: randomCode,
    });
    await newUser.save();
    await verifierEmail().catch((err) => next(err));
    setTimeout(async () => {
      await UserModel.findByIdAndUpdate(newUser._id, { verification_code: 0 });
    }, 60 * 1000);
    res.status(201).json({
      message: `Sizning ${email} elektron pochta manzilingizga tasdiqlash kodi jo'natildi!`,
    });
  } catch (error) {
    console.log(error);
  }
}

async function verify(req, res, next) {
  try {
    const { email, code } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) {
      return next(BaseError.BadRequest(404), "Bunday foydalanuvchi topilmadi!");
    }
    if (code === foundUser.verification_code) {
      await UserModel.findByIdAndUpdate(foundUser.id, {
        isVerified: true,
        verification_code: 0,
      });
      return res.status(200).json({
        message: "Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi!",
      });
    } else {
      return res.status(200).json({
        message: "Kod tasdiqlanmadi!",
      });
    }
  } catch (error) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
    if (!foundUser) {
      return next(
        BaseError.BadRequest(
          401,
          "Siz ro'yxatdan o'tmagansiz, avval ro'yxatdan o'tishingiz lozim!"
        )
      );
    }
    const checkPassword = await bcryptjs.compare(password, foundUser.password);
    if (checkPassword && foundUser.isVerified === true) {
      const token = jwt.sign(
        {
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.SECRET_TIME,
        }
      );
      res.status(200).json({
        message: "Tizimga kirish muvaffaqiyatli amalga oshirildi!",
        token: token,
      });
    } else {
      next(
        BaseError.BadRequest(
          401,
          "Parol noto'g'ri kiritildi yoki email tasqidlanmagan!"
        )
      );
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  verify,
};
