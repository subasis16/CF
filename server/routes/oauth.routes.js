import express from "express";
import passport from "passport";

const router = express.Router();

/* GOOGLE */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${req.user.token}`
    );
  }
);

/* GITHUB */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${req.user.token}`
    );
  }
);

export default router;
