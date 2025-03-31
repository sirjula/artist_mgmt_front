import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/";

// SignUp API
export const signUp = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword:string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}users/signup/`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
  
};

// Login API
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}users/login/`, credentials);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch All Artists
export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}artists/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch Single Artist by ID
export const fetchArtistById = async (artistId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}artists/${artistId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a New Artist
export const createArtist = async (artistData: {
  name: string;
  dob: string;
  gender: string;
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}artists/`, artistData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update an Artist by ID
export const updateArtist = async (
  artistId: number,
  artistData: {
    name?: string;
    dob?: string;
    gender?: string;
    address?: string;
    first_release_year?: number;
    no_of_albums_released?: number;
  }
) => {
  try {
    const response = await axios.put(`${API_BASE_URL}artists/${artistId}/`, artistData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an Artist by ID
export const deleteArtist = async (artistId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}artists/${artistId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch All Songs
export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}music/`);
    return response.data; // Ensure this returns { music: [...] }
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch Single Song by ID
export const fetchSongById = async (musicId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}music/${musicId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a New song
export const createSong = async (musicData: {
  artist_id: number;
  title: string;
  album_name: string;
  genre: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}music/`, musicData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update an song by ID
export const updateSong = async (
  musicId: number,
  musicData: {
    id?: number;
    artist_id?: number;
    title?: string;
    album_name?: string;
    genre?: string;
  }
) => {
  try {
    const response = await axios.put(`${API_BASE_URL}music/${musicId}/`, musicData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an song by ID
export const deleteSong = async (musicId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}music/${musicId}/`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};