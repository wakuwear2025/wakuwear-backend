const express = require("express");
const Coupon = require("../models/Coupon");

const router = express.Router();

/**
 * GET all coupons
 */
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch coupons" });
  }
});

/**
 * CREATE coupon
 */
router.post("/", async (req, res) => {
  try {
    const { code, discount } = req.body;

    if (!code || !discount) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discount: Number(discount),
    });

    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    console.error("Coupon create error:", err);
    res.status(500).json({ message: "Failed to create coupon" });
  }
});

module.exports = router;



