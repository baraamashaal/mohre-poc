import { z } from 'zod'
import type {ComponentType, ReactElement, ReactNode} from 'react';

const dropdownItemSchema = z.object({
  label: z.string(),
  href: z.string(),
})

const dropdownGroupSchema = z.object({
  title: z.string(),
  items: z.array(dropdownItemSchema),
})

export const dropdownSchema = z.array(dropdownGroupSchema)

export const navItemSchema = z.object({
  children: z.union([z.string(), z.custom<ReactNode>()]),
  icon: z.custom<ComponentType<{ weight?: string; className?: string }>>().optional(),
  href: z.string().optional(),
  isActive: z.boolean().optional(),
  dropdown: z.union([dropdownSchema, z.custom<ReactElement>()]).optional(),
  asChild: z.boolean().optional(),
  type: z.enum(['primary', 'secondary']).optional(),
  tooltipText: z.string().optional(),
})

export const mainMenuSchema = z.object({
  children: z.union([z.string(), z.custom<ReactNode>()]),
  className: z.string().optional(),
})

export const secondaryMenuSchema = z.object({
  children: z.union([z.string(), z.custom<ReactNode>()]),
  className: z.string().optional(),
})

export type DropdownItem = z.infer<typeof dropdownItemSchema>
export type DropdownGroup = z.infer<typeof dropdownGroupSchema>
export type DropdownData = z.infer<typeof dropdownSchema>
