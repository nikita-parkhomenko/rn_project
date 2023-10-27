import { RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDoorByTagIdLazyQuery, useDoorLazyQuery } from '../queries';
import { DoorsStackParamList } from '../routing/DoorsStackScreen';
import Routes from '../routing/Routes';

export default function useDoor(route: RouteProp<DoorsStackParamList, Routes.Door>, updateDoor: boolean) {
  const [queryType, setQueryType] = useState<'id' | 'tagId'>('id');
  const [getByTagId, { data: doorByTagId, loading: loadingTag, error: errorTag }] = useDoorByTagIdLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [getById, { data: doorById, loading, error }] = useDoorLazyQuery({ fetchPolicy: 'cache-and-network' });

  useEffect(() => {
    if (route || updateDoor) {
      // the order of conditions is important here - check doorTagId first because that is from the Identify page
      // the user can access the identify button anywhere
      if (route.params.doorTagId) {
        setQueryType('tagId');
        getByTagId({
          variables: {
            tagId: route.params.doorTagId,
          },
        });
      } else if (route.params.doorId) {
        setQueryType('id');
        getById({
          variables: {
            id: route.params.doorId.toString(),
          },
        });
      }
    }
  }, [getById, getByTagId, route, queryType, updateDoor]);

  if (queryType === 'tagId') {
    return { door: doorByTagId?.doorByTagId, loading: loadingTag, error: errorTag };
  }

  return { door: doorById?.door, loading, error };
}
