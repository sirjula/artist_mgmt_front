import { useEffect, useState } from "react"
import { fetchArtists, deleteArtist, updateArtist } from "@/api/api"
import { Button } from "@/components/ui/button"
import { Trash2, UserRoundPen } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { AddArtistDialog } from "@/components/artist/addartistform"
import { EditArtistDialog } from "@/components/artist/editartist"

export default function TableArtist() {
  const [artists, setArtists] = useState<Array<{ 
    id: number; 
    name: string; 
    dob: string; 
    gender: string; 
    address: string; 
    first_release_year: string; 
    no_of_albums_released: string; 
  }>>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<any>(null)

  // Gender mapping
  const genderMap: { [key: string]: string } = {
    m: "Male",
    f: "Female",
    o: "Other",
  }

  useEffect(() => {
    fetchArtistsData()
  }, [])

  const fetchArtistsData = async () => {
    try {
      const data = await fetchArtists()
      setArtists(data.artists || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (deleteId === null) return
    try {
      await deleteArtist(deleteId)
      setArtists(prevArtists => prevArtists.filter(artist => artist.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete artist")
    }
  }

  const handleEdit = (artist: any) => {
    setSelectedArtist(artist)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Artists List</h2>
        <AddArtistDialog onArtistAdded={fetchArtistsData} />
      </div>
      
      {loading && <p className="text-center text-lg">Loading artists...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>First Release Year</TableHead>
              <TableHead>No. of Albums Released</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.length > 0 ? (
              artists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>{artist.name}</TableCell>
                  <TableCell>{new Date(artist.dob).toISOString().split("T")[0]}</TableCell>
                  <TableCell>{genderMap[artist.gender] || "Unknown"}</TableCell>
                  <TableCell>{artist.address}</TableCell>
                  <TableCell>{artist.first_release_year}</TableCell>
                  <TableCell>{artist.no_of_albums_released}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-700"
                        onClick={() => handleEdit(artist)}
                      >
                        <UserRoundPen className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-700"
                            onClick={() => setDeleteId(artist.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this artist? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-700"
                              onClick={handleDelete}
                            >
                              Confirm Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No artists found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="text-right font-bold">
                Total: {artists.length} artists
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}

      {/* Edit Artist Dialog */}
      {selectedArtist && (
        <EditArtistDialog
          artist={selectedArtist}
          open={Boolean(selectedArtist)}
          onOpenChange={(open) => !open && setSelectedArtist(null)}
          onSave={async (updatedArtist) => {
            try {
              await updateArtist(updatedArtist.id, updatedArtist) // Save to backend
              
              // Update state locally without re-fetching
              setArtists((prevArtists) =>
                prevArtists.map((artist) =>
                  artist.id === updatedArtist.id
                    ? { ...updatedArtist, no_of_albums_released: String(updatedArtist.no_of_albums_released) }
                    : artist
                )
              );
            } catch (error) {
              console.error("Error saving artist:", error);
            }
          }}
          
        />
      )}
    </div>
  )
}
