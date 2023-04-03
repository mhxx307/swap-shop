import {
    useAddToFavoriteMutation,
    useFavoritesQuery,
    useIsFavoriteQuery,
    useMeQuery,
    useRemoveFromFavoriteMutation,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

function useFavorites({ articleId }: { articleId: string }) {
    const router = useRouter();
    const { data: me, loading } = useMeQuery();

    const [addToFavorite] = useAddToFavoriteMutation();
    const [removeFromFavorite] = useRemoveFromFavoriteMutation();
    const { data: isFavoriteData, refetch } = useIsFavoriteQuery({
        variables: {
            articleId: articleId,
        },
        skip: !me?.me,
    });
    const { refetch: refetchFavorites } = useFavoritesQuery();

    const handleAddToFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!loading && !me?.me) {
            router.push('/login');
            return;
        }

        if (isFavoriteData?.isFavorite) {
            await removeFromFavorite({
                variables: {
                    articleIds: [articleId],
                },
                onCompleted: () => {
                    refetch();
                    refetchFavorites();
                },
            });
        } else {
            await addToFavorite({
                variables: {
                    articleId: articleId,
                },
                onCompleted: () => {
                    refetch();
                    refetchFavorites();
                },
            });
        }
    };
    return {
        handleAddToFavorite,
        isFavorite: isFavoriteData?.isFavorite,
    };
}

export default useFavorites;
