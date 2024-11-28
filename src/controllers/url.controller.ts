import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generate } from "shortid";
import { isValidUrl } from "../utils/validate-url.util";
import { NotFoundError, ValidationError } from "../utils/errors.util";

const prisma = new PrismaClient();

export const shortenUrl = async (req: Request, res: Response) => {
  const { longUrl } = req.body;

  if (!isValidUrl(longUrl)) {
    throw new ValidationError("Invalid URL provided");
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
};

export const redirectToLongUrl = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const url = await prisma.url.findFirst({ where: { shortCode } });
  if (!url) {
    throw new NotFoundError("URL not found");
  }

  await prisma.url.update({
    where: { shortCode },
    data: { clicks: { increment: 1 } },
  });

  res.redirect(url.longUrl);
};

export const deleteShortUrl = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const url = await prisma.url.findFirst({ where: { shortCode } });
  if (!url) {
    throw new NotFoundError("URL not found");
  }

  await prisma.url.delete({ where: { shortCode } });

  res.status(204).send();
};
