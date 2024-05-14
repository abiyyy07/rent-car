import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import app from "./init";
import bcrypt from 'bcrypt'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

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

export async function updateData(collectionName: string, id: string, data: any) {
    const docRef = doc(firestore, collectionName, id)
    try {
        await updateDoc(docRef, data)
    } catch (error) {
        console.log("Error to updating data")
        return false;
    }
}

export async function deleteData(collectionName: string, id: string): Promise<boolean> {
    const docRef = doc(firestore, collectionName, id)

    try {
        await deleteDoc(docRef)
        return true;
    } catch (error) {
        console.log("Error deleting data:", error)
        return false;
    }
}

export async function createCar(data: {
    mobil: string,
    brand: string,
    model: string,
    jumlah: string,
    tahun: string,
    transmisi: string,
    seat: string,
    hargaLK: string,
    hargaD: string,
    gambarMobil: File,
    imageurl?: string,
    timestamp?: Date,
    updateAt?: Date,
}) {
    const q = query(collection(firestore, "car"), where("mobil", "==", data.mobil))
    const snapshot = await getDocs(q)
    const car = snapshot.docs.map((doc) => ({
        id: doc.data(),
        ...doc.data()
    }))

    if (car.length > 0) {
        return { status: false, message: "Mobil sudah terdaftar" };
    } else {
        const file = data.gambarMobil;
        const extension = file.name.split('.').pop();
        const newFileName = `${data.mobil.replace(/\s+/g, '_')}.${extension}`;

        const storageRef = ref(storage, `armada/${newFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, data.gambarMobil);
        await uploadTask;

        const downloadURL = await getDownloadURL(storageRef);

        data.imageurl = downloadURL;
        data.timestamp = new Date();
        data.updateAt = new Date();

        try {
            const {gambarMobil, ...dataMobil} = data;
            await addDoc(collection(firestore, "cars"), dataMobil)
            return {status: true, statusCode: 200, message: "Success to Add New Car Unit"};
        } catch (error) {
            return { status: false, statusCode: 400, message: "Terjadi kesalahan saat menambahkan armada" };
        }
    }
}