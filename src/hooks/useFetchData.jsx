import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPath,
  setItems,
  setPermisos,
  setSelectedFolder,
  selectItem,
} from '@/store/slices/itemSlice';
import {
  getFoldersRequests,
  getFolderPermissionsRequests,
} from '@/api/folders';
import {
  getDocumentsRequests,
  getOficialDocumentsRequests,
  getLocalDocumentsRequests,
} from '@/api/documents';
import { getUsersRequests } from '@/api/users';

const useFetchData = (options = {}) => {
  const { type } = options;
  const dispatch = useDispatch();
  const path = useSelector((state) => state.item.path);
  const items = useSelector((state) => state.item.items);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [permisosCheckBox, setPermisosCheckBox] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) return; // Si user es null, no continuar
    setLoading(true);
    dispatch(setPath([]));
    const fetchItems = async () => {
      try {
        dispatch(selectItem(null));
        let obtainedItems = [];
        const resFolders = await getFoldersRequests();
        if (type === 'compartidos') {
          dispatch(setPath([resFolders.data[0].id]));
          const resDocuments = await getDocumentsRequests();
          obtainedItems = [...resFolders.data, ...resDocuments.data];
        } else if (type === 'oficiales') {
          dispatch(setPath([resFolders.data[1].id]));
          const resDocuments = await getOficialDocumentsRequests();
          obtainedItems = [...resFolders.data, ...resDocuments.data];
        } else if (type === 'locales') {
          dispatch(setPath([resFolders.data[user.id + 1].id]));
          const resDocuments = await getLocalDocumentsRequests(user.id);
          obtainedItems = [...resFolders.data, ...resDocuments.data];
          // console.log('obtainedItems locales:', obtainedItems);
        }
        dispatch(setItems([...obtainedItems]));
        setLoading(false);
        const permisos = await getFolderPermissionsRequests();
        dispatch(setPermisos(permisos.data));
      } catch (error) {
        console.error('Error al obtener los items', error);
      }
    };

    const fetchUsers = async () => {
      const res = await getUsersRequests();
      setUsers(res.data);
      const array = res.data.map((user) => ({ id: user.id, checked: true }));
      setPermisosCheckBox(array);
    };

    fetchItems();
    fetchUsers();
  }, [type, user, dispatch]);

  useEffect(() => {
    const selectedFolder = items.find(
      (item) => !item.hasOwnProperty('key') && item.id === path[path.length - 1]
    );
    if (selectedFolder) {
      dispatch(setSelectedFolder(selectedFolder));
    }
  }, [path, items, dispatch]);

  return { items, loading, users, permisosCheckBox, setPermisosCheckBox };
};

export default useFetchData;
