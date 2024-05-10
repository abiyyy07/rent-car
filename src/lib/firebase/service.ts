import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";
import bcrypt from 'bcrypt'
import { getStorage } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);
export default storage;

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName))
    const data = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data()
    }))

    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id))
    const data = snapshot.data()
    return data;
}

export async function register(data: {
    email:string,
    password:string,  
    username:string,
    birthday: string,
    phone: string,
    address: string,
    role?: string,
    timestamp?: Date,
},) {
    const q = query(collection(firestore, "user"), where("email", "==", data.email))
    const snapshot = await getDocs(q)
    const users = snapshot.docs.map((doc) => ({
        id : doc.id,
        ...doc.data(),
    }))

    if (users.length > 0) {
        return {status: false, message: "Email Already Used"}
    } else {
        data.role = "member";
        data.timestamp = new Date();
        data.password = await bcrypt.hash(data.password, 10)
    }

    try {
        await addDoc(collection(firestore, "users"), data);
        return {status: true, statusCode: 200, message: "Success Regist"};
    } catch (error) {
        return {sttaus: false, statusCode: 400, message: "Failed"}
    }
}

export async function login(data: {email: string}) {
    const q = query(
        collection(firestore, 'users'),
        where("email", "==", data.email)
    )
    const snapshot = await getDocs(q);
    const user = snapshot.docs.map((doc) => ({
        id: doc.id,
     ...doc.data(),
    }))

    if (user) {
        return user[0];
    } else {
        return null;
    }
}