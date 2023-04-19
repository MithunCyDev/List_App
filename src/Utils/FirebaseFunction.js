import {collection, doc, getDocs, orderBy, query, setDoc} from 'firebase/firestore';
import { firestore, } from '../firebase.config';

//saving new Member List
export const saveMember = async (data)=>{
    await setDoc(doc(firestore, "member_list", `${Date.now()}`), data, {marge: true,});
};
export const saveNewMember = async (data)=>{
    await setDoc(doc(firestore, "member_list", `${Date.now()}`), data, {marge: true,});
};
// //saving new Item
// export const saveItem = async (data)=>{
//     await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
//         marge: true,
//     });
// };

export const getAllMember = async ()=>{
    const items = await getDocs(
        query(collection(firestore, "member_list"), orderBy("id", "desc"))
    );
    return items.docs.map((doc) => doc.data());
};

