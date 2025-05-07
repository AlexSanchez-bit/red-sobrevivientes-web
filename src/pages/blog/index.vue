<template>
  <div>
    <LazyLoadScroll :service="service" :filter="{}" class="m-3  w-fit "
      :display-class="'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 place-content-center items-center justify-center'">
      <template #item="{ item }">
        <BlogCarouselItem :item="item" class="" />
      </template>
      <template #skeletons>
        <Skeleton class="!min-w-72 !h-64" />
      </template>
    </LazyLoadScroll>
  </div>
</template>
<script setup lang="ts">


import LazyLoadScroll from '@/components/LazyLoadScroll.vue';
import { useBlogService } from '@/composables/Blog/useBlogService';
import type { IBlogEntrie } from '@/services/Blog/Blog.service';
import { Filter } from '@/utils/entities/Filter';
import type { IGenericLister } from '@/utils/entities/IGenericLister';
import { Pagination } from '@/utils/entities/Pagination';
import type { IResponseModel } from '@/utils/entities/ResponseModel';
import type { IListResponse } from '@/utils/entities/IListResponse';
import { Sorter } from '@/utils/entities/Sorters';
import { ref } from 'vue';
import BlogCarouselItem from '@/components/BlogCarouselItem.vue';
import { Skeleton } from 'primevue';

const filter_array = ref<Filter[]>([]);
const sort = ref<Sorter[]>([]);
const blog_service = useBlogService()

const service: IGenericLister<IBlogEntrie> = {
  GetAll: async (page: number, limit: number, filter: any) => {
    const resp = await blog_service.getAllTotalCount(
      [...filter_array.value].filter((e) => e != null && e.value != null),
      new Pagination(page, limit),
      [...sort.value],
    );

    return {
      data: {
        items: resp.data,
        totalPages: Math.floor(resp.totalCount / limit),
      },
      error: resp == null ? {} : null,
    } as IResponseModel<IListResponse<IBlogEntrie>>;
  },
};
</script>
