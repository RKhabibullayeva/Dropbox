import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, where, query, onSnapshot, getDocs } from 'firebase/firestore';
import { auth, db, getUserFiles } from './../Api/firebaseConfig'
export const createUserAndProfileAsync = createAsyncThunk(
	"user/createUserAndProfile",
	async ({ email, password, userName }, thunkAPI) => {
	  try {
		const user = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(auth.currentUser, {displayName: userName});
		return user;
	  } catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	  }
	}
  );
  export const uploadFile = createAsyncThunk(
	'files/upload',
	async ({file, userUid}) => {
	  try {
		const storage = getStorage();
		const namer = `${new Date()}_${file.name}`;
		const storageRef = ref(storage, namer);
		const uploadTask = uploadBytesResumable(storageRef, file);
  
		const snapshot = await uploadTask;
  
		const url = await getDownloadURL(snapshot.ref);
  
		const fileData = {
		  name: namer,
		  filename: file.name,
		  url: url,
		  userId: userUid.uid, // Replace this with the user ID
		};
  
		const docRef = await addDoc(collection(db, 'files'), fileData);
  
		return {
		  id: docRef.id,
		  ...fileData,
		};
	  } catch (error) {
		console.log(error);
		throw error;
	  }
	}
  );
  export const fetchUserFiles = createAsyncThunk('userFiles/fetchUserFiles',async (userId) => {
	  const filesRef = collection(db, 'files');
	  const userFilesQuery = query(filesRef, where('userId', '==', userId));
	  const snapshot = await onSnapshot(userFilesQuery);
	  const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	  return files;
	}
  )

  export const fetchUserFile = createAsyncThunk(
	'files/fetchUserFilesfetchUserFile',
	async (userId, { rejectWithValue }) => {
	  try {
		const filesRef = collection(db, 'files');
		const userFilesQuery = query(filesRef, where('userId', '==', userId));
		const snapshot = await getDocs(userFilesQuery);
		const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return files;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	}
  );
