import {userData} from './hookToken'


//const [updateInfoUser, setUpdateInfoUser] = useState(false)

export const callUpdateTokenUser = async (cb) => {
    const newTokenResponse = await apiGetNewToken(userData.id)
    await validarYDescrifarToken(newTokenResponse);
    cb(); //Callback desde editProfile.jsx para volver a Profile
  }

//  useEffect(() => {
//     const getNewDataUser = async () => {
//       const newTokenResponse = await apiGetNewToken(userData.id)
//       validarYDescrifarToken(newTokenResponse);
//       setUpdateInfoUser(false);
//     }
//     if (updateInfoUser) {
//       getNewDataUser();
//     }
//   }, [updateInfoUser])
