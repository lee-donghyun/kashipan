import {useCallback} from 'react';
import {trigger as haptic} from 'react-native-haptic-feedback';
import useSWRInfinite from 'swr/infinite';

import {Post} from '../data-types/post';

const PAGE_SIZE = 10;
export const useThread = () => {
  const {data, mutate, isLoading, isValidating, setSize} = useSWRInfinite<
    Post[]
  >(page => ['/post', {page, size: PAGE_SIZE}]);

  const loadMore = useCallback(() => {
    setSize(size => size + 1);
  }, [setSize]);

  const refresh = useCallback(
    (vibrate: boolean = true) => {
      vibrate && haptic('impactMedium');
      return mutate();
    },
    [mutate],
  );

  return {data, mutate, isLoading, isValidating, loadMore, refresh};
};
