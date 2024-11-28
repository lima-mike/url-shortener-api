import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { generate } from "shortid";
import { isValidUrl } from "../utils/validate-url.util";

const prisma = new PrismaClient();

export const shortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { longUrl } = req.body;

  try {
    if (!isValidUrl(longUrl)) {
      res.status(400).json({ error: "Invalid url provided" });
      return;
    }
    const shortCode = generate();
    const url = await prisma.url.create({
      data: { longUrl, shortCode },
    });

    res.status(201).json({
      shortCode: url.shortCode,
      shortUrl: `http://localhost:${process.env.PORT}/${url.shortCode}`,
      longUrl: url.longUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const redirectToLongUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { shortCode } = req.params;

  try {
    const url = await prisma.url.findFirst({ where: { shortCode } });
    if (!url) {
      res.status(404).json({ error: "Url not found" });
      return;
    }

    await prisma.url.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } },
    });

    res.redirect(url.longUrl);
  } catch (error) {
    next(error);
  }
};

export const deleteShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { shortCode } = req.params;

  try {
    const url = await prisma.url.findFirst({ where: { shortCode } });
    if (!url) {
      res.status(404).json({ error: "Url not found" });
      return;
    }

    await prisma.url.delete({ where: { shortCode } });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
