"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createArtist } from "@/api/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ArtistData = {
    name: string;
    dob: string;
    gender: string;
    address: string;
    first_release_year: string;
    no_of_albums_released: string;
}

interface AddArtistDialogProps {
  onArtistAdded: () => void
}

export function AddArtistDialog({ onArtistAdded }: AddArtistDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ArtistData>({
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "artist_id" ? Number.parseInt(value) : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value ,
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createArtist(formData)
      setOpen(false)
      onArtistAdded()
      setFormData({
        name: "",
        dob: "",
        gender: "",
        address: "",
        first_release_year: "",
        no_of_albums_released: "",
      })
    } catch (error) {
      console.error("Error adding artist:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">+ Add Song</Button>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
          <DialogDescription>Fill in the details to add a new artist.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Artist Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date Of Birth
              </Label>
              <Input
                id="dob"
                name="dob"
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
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">Male</SelectItem>
                  <SelectItem value="f">Female</SelectItem>
                  <SelectItem value="o">others</SelectItem>
                </SelectContent>
              </Select>
              </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="album_name" className="text-right">
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
              First Release Year
              </Label>
              <Input
                id="first_release_year"
                name="first_release_year"
                value={formData.first_release_year}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="no_of_albums_released" className="text-right">
              No Of Albums Released
              </Label>
              <Input
                id="no_of_albums_released"
                name="no_of_albums_released"
                value={formData.no_of_albums_released}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Song"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
