
// interface GetListDataProps {
//     apiurl: string;
//     method: string;
//     body?: any;
// }
// import axios from "axios";
// import { useAppDispatch } from "@/lib/hooks";
// import { setData } from "@/redux/feature/dateSlice";

// const dispatch = useAppDispatch();
// export async function getListData({ apiurl, method, body }: GetListDataProps) {
//     try {
//         const response = await axios((apiurl), {
//             method: method,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             data: body ? JSON.stringify(body) : null,
//         })
//         if (response.status === 200) {
//             dispatch(setData(response?.data?.data));
//         }


//     } catch (error) {
//         console.log('Error fetching data:', error);
//         throw error;
//     }
// }