/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRecipeDto } from '../models/CreateRecipeDto';
import type { OutputRecipeDto } from '../models/OutputRecipeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RecipesService {
    /**
     * Get recipes
     * @param page
     * @param limit
     * @param search
     * @param maxCookingTime
     * @param minIngredients
     * @returns OutputRecipeDto
     * @throws ApiError
     */
    public static recipesControllerGetAllRecipes(
        page: number = 1,
        limit: number = 10,
        search?: string,
        maxCookingTime?: number,
        minIngredients?: number,
    ): CancelablePromise<Array<OutputRecipeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recipes',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'maxCookingTime': maxCookingTime,
                'minIngredients': minIngredients,
            },
        });
    }
    /**
     * Create recipe
     * @param requestBody
     * @returns OutputRecipeDto
     * @throws ApiError
     */
    public static recipesControllerCreateRecipe(
        requestBody: CreateRecipeDto,
    ): CancelablePromise<OutputRecipeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/recipes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Add like to recipe
     * @param id
     * @returns OutputRecipeDto
     * @throws ApiError
     */
    public static recipesControllerLikeRecipe(
        id: number,
    ): CancelablePromise<OutputRecipeDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/recipes/{id}/like',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Remove like from recipe
     * @param id
     * @returns OutputRecipeDto
     * @throws ApiError
     */
    public static recipesControllerUnlikeRecipe(
        id: number,
    ): CancelablePromise<OutputRecipeDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/recipes/{id}/like',
            path: {
                'id': id,
            },
        });
    }
}
