import { useAuthContext } from '@/contexts/AuthContext';
import {
    useAddToFavoriteMutation,
    useFavoritesQuery,
    useIsFavoriteQuery,
    useRemoveFromFavoriteMutation,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

function useFavorites({ articleId }: { articleId: string }) {
    const router = useRouter();
    const { profile } = useAuthContext();

    const [addToFavorite] = useAddToFavoriteMutation();
    const [removeFromFavorite] = useRemoveFromFavoriteMutation();
    const { data: isFavoriteData, refetch } = useIsFavoriteQuery({
        variables: {
            articleId: articleId,
        },
        skip: !profile,
    });
    const { refetch: refetchFavorites } = useFavoritesQuery();

    const handleAddToFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!profile) {
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
