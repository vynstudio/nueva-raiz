import { z } from "zod";

export const HelpType = z.enum(["labor", "labor-truck", "hauling"]);
export type HelpType = z.infer<typeof HelpType>;

export const ResidenceType = z.enum(["house", "apartment", "townhome", "storage"]);
export type ResidenceType = z.infer<typeof ResidenceType>;

export const ApartmentFloor = z.enum(["1", "2", "3", "4", "5+"]);
export type ApartmentFloor = z.infer<typeof ApartmentFloor>;

export const QuoteSchema = z.object({
  helpType: HelpType,
  fromAddress: z.string().min(3),
  fromResidence: ResidenceType,
  fromFloor: ApartmentFloor.optional(),
  toAddress: z.string().min(3),
  toResidence: ResidenceType,
  toFloor: ApartmentFloor.optional(),
  date: z.string().min(1),
  specialItems: z.string().max(500).optional().default(""),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
});

export type QuoteInput = z.infer<typeof QuoteSchema>;

export const HELP_LABEL: Record<HelpType, string> = {
  labor: "Solo mano de obra · Tengo camión o POD",
  "labor-truck": "Mano de obra + Camión · Mudanza completa",
  hauling: "Acarreo / Retiro de basura",
};

export const RESIDENCE_LABEL: Record<ResidenceType, string> = {
  house: "Casa",
  apartment: "Apartamento",
  townhome: "Townhome",
  storage: "Bodega / Storage",
};

export const FLOOR_LABEL: Record<ApartmentFloor, string> = {
  "1": "Piso 1",
  "2": "Piso 2",
  "3": "Piso 3",
  "4": "Piso 4",
  "5+": "5+ (¿hay ascensor?)",
};
