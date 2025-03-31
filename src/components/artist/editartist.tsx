"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ArtistData = {
  id: number
  name: string
  dob: string
  gender: string
  address: string
  first_release_year: string
  no_of_albums_released: number
}

interface EditArtistDialogProps {
  artist: ArtistData
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (artist: ArtistData) => Promise<void>
}

export function EditArtistDialog({ artist, open, onOpenChange, onSave }: EditArtistDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ArtistData>({ ...artist})

  useEffect(() => {
    setFormData({
      ...artist,
      // Format dates to YYYY-MM-DD
      dob: typeof artist.dob === "string" ? artist.dob.split("T")[0] : artist.dob,
      first_release_year:
        typeof artist.first_release_year === "string"
          ? artist.first_release_year.split("T")[0]
          : artist.first_release_year,
    })
  }, [artist])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "no_of_albums_released" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Submitting form data:", formData)
      await onSave(formData)
      onOpenChange(false)
    } catch (error) {
      console.error("Error in edit dialog:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Artist</DialogTitle>
          <DialogDescription>Update the artist details and save your changes.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date of Birth
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Select value={formData.gender} onValueChange={handleSelectChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">Male</SelectItem>
                  <SelectItem value="f">Female</SelectItem>
                  <SelectItem value="o">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_release_year" className="text-right">
                First Release Date
              </Label>
              <Input
                id="first_release_year"
                name="first_release_year"
                type="date"
                value={formData.first_release_year}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="no_of_albums_released" className="text-right">
                Albums Released
              </Label>
              <Input
                id="no_of_albums_released"
                name="no_of_albums_released"
                type="number"
                value={formData.no_of_albums_released || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
