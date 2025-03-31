"use client"
import { useEffect, useState } from "react"
import { fetchSongs, fetchArtists, deleteSong, updateSong } from "@/api/api"
import { Button } from "@/components/ui/button"
import { Trash2, UserRoundPen } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
} from "@/components/ui/alert-dialog";
import { AddSongDialog } from "@/components/song/addsongform";
import { EditSongDialog } from "@/components/song/editsong";

type Song = {
  id: number;
  artist_id: number;
  title: string;
  album_name: string;
  genre: string;
};

type Artist = {
  id: number;
  name: string;
};

export default function TableSong() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editSong, setEditSong] = useState<Song | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  useEffect(() => {
    const getSongsAndArtists = async () => {
      try {
        const [songsData, artistsData] = await Promise.all([fetchSongs(), fetchArtists()]);
        setSongs(songsData.music || []);
        const artistMap: Record<number, string> = {};
        artistsData.artists.forEach((artist: Artist) => {
          artistMap[artist.id] = artist.name;
        });
        setArtists(artistMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getSongsAndArtists();
  }, []);

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteSong(deleteId);
      setSongs(songs.filter(song => song.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete song");
    }
  };

  const handleEdit = (song: Song) => {
    setEditSong(song);
    setEditOpen(true);
  };

  const handleSave = async (updatedSong: Song) => {
    try {
      await updateSong(updatedSong.id, updatedSong);
      setSongs(songs.map(song => (song.id === updatedSong.id ? updatedSong : song)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update song");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Songs List</h2>
        <AddSongDialog onSongAdded={() => fetchSongs().then(data => setSongs(data.music || []))} />
      </div>
      {loading && <p className="text-center text-lg">Loading songs...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Album</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songs.length > 0 ? (
              songs.map(song => (
                <TableRow key={song.id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{artists[song.artist_id] || "Unknown Artist"}</TableCell>
                  <TableCell>{song.album_name}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-700"
                        onClick={() => handleEdit(song)}
                      >
                        <UserRoundPen className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-700"
                            onClick={() => setDeleteId(song.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this song? This action cannot be undone.
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
                <TableCell colSpan={5} className="text-center">No Songs found</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-right font-bold">Total: {songs.length} songs</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}

      {/* Edit Dialog */}
      {editSong && (
        <EditSongDialog
          song={editSong}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
