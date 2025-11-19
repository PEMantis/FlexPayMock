import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProcessorEventModel = runtime.Types.Result.DefaultSelection<Prisma.$ProcessorEventPayload>;
export type AggregateProcessorEvent = {
    _count: ProcessorEventCountAggregateOutputType | null;
    _avg: ProcessorEventAvgAggregateOutputType | null;
    _sum: ProcessorEventSumAggregateOutputType | null;
    _min: ProcessorEventMinAggregateOutputType | null;
    _max: ProcessorEventMaxAggregateOutputType | null;
};
export type ProcessorEventAvgAggregateOutputType = {
    amountCents: number | null;
};
export type ProcessorEventSumAggregateOutputType = {
    amountCents: number | null;
};
export type ProcessorEventMinAggregateOutputType = {
    id: string | null;
    type: string | null;
    authId: string | null;
    amountCents: number | null;
    createdAt: Date | null;
};
export type ProcessorEventMaxAggregateOutputType = {
    id: string | null;
    type: string | null;
    authId: string | null;
    amountCents: number | null;
    createdAt: Date | null;
};
export type ProcessorEventCountAggregateOutputType = {
    id: number;
    type: number;
    authId: number;
    amountCents: number;
    payload: number;
    createdAt: number;
    _all: number;
};
export type ProcessorEventAvgAggregateInputType = {
    amountCents?: true;
};
export type ProcessorEventSumAggregateInputType = {
    amountCents?: true;
};
export type ProcessorEventMinAggregateInputType = {
    id?: true;
    type?: true;
    authId?: true;
    amountCents?: true;
    createdAt?: true;
};
export type ProcessorEventMaxAggregateInputType = {
    id?: true;
    type?: true;
    authId?: true;
    amountCents?: true;
    createdAt?: true;
};
export type ProcessorEventCountAggregateInputType = {
    id?: true;
    type?: true;
    authId?: true;
    amountCents?: true;
    payload?: true;
    createdAt?: true;
    _all?: true;
};
export type ProcessorEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcessorEventWhereInput;
    orderBy?: Prisma.ProcessorEventOrderByWithRelationInput | Prisma.ProcessorEventOrderByWithRelationInput[];
    cursor?: Prisma.ProcessorEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProcessorEventCountAggregateInputType;
    _avg?: ProcessorEventAvgAggregateInputType;
    _sum?: ProcessorEventSumAggregateInputType;
    _min?: ProcessorEventMinAggregateInputType;
    _max?: ProcessorEventMaxAggregateInputType;
};
export type GetProcessorEventAggregateType<T extends ProcessorEventAggregateArgs> = {
    [P in keyof T & keyof AggregateProcessorEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProcessorEvent[P]> : Prisma.GetScalarType<T[P], AggregateProcessorEvent[P]>;
};
export type ProcessorEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcessorEventWhereInput;
    orderBy?: Prisma.ProcessorEventOrderByWithAggregationInput | Prisma.ProcessorEventOrderByWithAggregationInput[];
    by: Prisma.ProcessorEventScalarFieldEnum[] | Prisma.ProcessorEventScalarFieldEnum;
    having?: Prisma.ProcessorEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProcessorEventCountAggregateInputType | true;
    _avg?: ProcessorEventAvgAggregateInputType;
    _sum?: ProcessorEventSumAggregateInputType;
    _min?: ProcessorEventMinAggregateInputType;
    _max?: ProcessorEventMaxAggregateInputType;
};
export type ProcessorEventGroupByOutputType = {
    id: string;
    type: string;
    authId: string | null;
    amountCents: number;
    payload: runtime.JsonValue;
    createdAt: Date;
    _count: ProcessorEventCountAggregateOutputType | null;
    _avg: ProcessorEventAvgAggregateOutputType | null;
    _sum: ProcessorEventSumAggregateOutputType | null;
    _min: ProcessorEventMinAggregateOutputType | null;
    _max: ProcessorEventMaxAggregateOutputType | null;
};
type GetProcessorEventGroupByPayload<T extends ProcessorEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProcessorEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProcessorEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProcessorEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProcessorEventGroupByOutputType[P]>;
}>>;
export type ProcessorEventWhereInput = {
    AND?: Prisma.ProcessorEventWhereInput | Prisma.ProcessorEventWhereInput[];
    OR?: Prisma.ProcessorEventWhereInput[];
    NOT?: Prisma.ProcessorEventWhereInput | Prisma.ProcessorEventWhereInput[];
    id?: Prisma.StringFilter<"ProcessorEvent"> | string;
    type?: Prisma.StringFilter<"ProcessorEvent"> | string;
    authId?: Prisma.StringNullableFilter<"ProcessorEvent"> | string | null;
    amountCents?: Prisma.IntFilter<"ProcessorEvent"> | number;
    payload?: Prisma.JsonFilter<"ProcessorEvent">;
    createdAt?: Prisma.DateTimeFilter<"ProcessorEvent"> | Date | string;
};
export type ProcessorEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    authId?: Prisma.SortOrderInput | Prisma.SortOrder;
    amountCents?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProcessorEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProcessorEventWhereInput | Prisma.ProcessorEventWhereInput[];
    OR?: Prisma.ProcessorEventWhereInput[];
    NOT?: Prisma.ProcessorEventWhereInput | Prisma.ProcessorEventWhereInput[];
    type?: Prisma.StringFilter<"ProcessorEvent"> | string;
    authId?: Prisma.StringNullableFilter<"ProcessorEvent"> | string | null;
    amountCents?: Prisma.IntFilter<"ProcessorEvent"> | number;
    payload?: Prisma.JsonFilter<"ProcessorEvent">;
    createdAt?: Prisma.DateTimeFilter<"ProcessorEvent"> | Date | string;
}, "id">;
export type ProcessorEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    authId?: Prisma.SortOrderInput | Prisma.SortOrder;
    amountCents?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProcessorEventCountOrderByAggregateInput;
    _avg?: Prisma.ProcessorEventAvgOrderByAggregateInput;
    _max?: Prisma.ProcessorEventMaxOrderByAggregateInput;
    _min?: Prisma.ProcessorEventMinOrderByAggregateInput;
    _sum?: Prisma.ProcessorEventSumOrderByAggregateInput;
};
export type ProcessorEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProcessorEventScalarWhereWithAggregatesInput | Prisma.ProcessorEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProcessorEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProcessorEventScalarWhereWithAggregatesInput | Prisma.ProcessorEventScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProcessorEvent"> | string;
    type?: Prisma.StringWithAggregatesFilter<"ProcessorEvent"> | string;
    authId?: Prisma.StringNullableWithAggregatesFilter<"ProcessorEvent"> | string | null;
    amountCents?: Prisma.IntWithAggregatesFilter<"ProcessorEvent"> | number;
    payload?: Prisma.JsonWithAggregatesFilter<"ProcessorEvent">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProcessorEvent"> | Date | string;
};
export type ProcessorEventCreateInput = {
    id?: string;
    type: string;
    authId?: string | null;
    amountCents: number;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ProcessorEventUncheckedCreateInput = {
    id?: string;
    type: string;
    authId?: string | null;
    amountCents: number;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ProcessorEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    authId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountCents?: Prisma.IntFieldUpdateOperationsInput | number;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcessorEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    authId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountCents?: Prisma.IntFieldUpdateOperationsInput | number;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcessorEventCreateManyInput = {
    id?: string;
    type: string;
    authId?: string | null;
    amountCents: number;
    payload: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ProcessorEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    authId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountCents?: Prisma.IntFieldUpdateOperationsInput | number;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcessorEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    authId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amountCents?: Prisma.IntFieldUpdateOperationsInput | number;
    payload?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProcessorEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    authId?: Prisma.SortOrder;
    amountCents?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProcessorEventAvgOrderByAggregateInput = {
    amountCents?: Prisma.SortOrder;
};
export type ProcessorEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    authId?: Prisma.SortOrder;
    amountCents?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProcessorEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    authId?: Prisma.SortOrder;
    amountCents?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProcessorEventSumOrderByAggregateInput = {
    amountCents?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ProcessorEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    authId?: boolean;
    amountCents?: boolean;
    payload?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["processorEvent"]>;
export type ProcessorEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    authId?: boolean;
    amountCents?: boolean;
    payload?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["processorEvent"]>;
export type ProcessorEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    authId?: boolean;
    amountCents?: boolean;
    payload?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["processorEvent"]>;
export type ProcessorEventSelectScalar = {
    id?: boolean;
    type?: boolean;
    authId?: boolean;
    amountCents?: boolean;
    payload?: boolean;
    createdAt?: boolean;
};
export type ProcessorEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "authId" | "amountCents" | "payload" | "createdAt", ExtArgs["result"]["processorEvent"]>;
export type $ProcessorEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProcessorEvent";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: string;
        authId: string | null;
        amountCents: number;
        payload: runtime.JsonValue;
        createdAt: Date;
    }, ExtArgs["result"]["processorEvent"]>;
    composites: {};
};
export type ProcessorEventGetPayload<S extends boolean | null | undefined | ProcessorEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload, S>;
export type ProcessorEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProcessorEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProcessorEventCountAggregateInputType | true;
};
export interface ProcessorEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProcessorEvent'];
        meta: {
            name: 'ProcessorEvent';
        };
    };
    findUnique<T extends ProcessorEventFindUniqueArgs>(args: Prisma.SelectSubset<T, ProcessorEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProcessorEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProcessorEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProcessorEventFindFirstArgs>(args?: Prisma.SelectSubset<T, ProcessorEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProcessorEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProcessorEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProcessorEventFindManyArgs>(args?: Prisma.SelectSubset<T, ProcessorEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProcessorEventCreateArgs>(args: Prisma.SelectSubset<T, ProcessorEventCreateArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProcessorEventCreateManyArgs>(args?: Prisma.SelectSubset<T, ProcessorEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProcessorEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProcessorEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProcessorEventDeleteArgs>(args: Prisma.SelectSubset<T, ProcessorEventDeleteArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProcessorEventUpdateArgs>(args: Prisma.SelectSubset<T, ProcessorEventUpdateArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProcessorEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProcessorEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProcessorEventUpdateManyArgs>(args: Prisma.SelectSubset<T, ProcessorEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProcessorEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProcessorEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProcessorEventUpsertArgs>(args: Prisma.SelectSubset<T, ProcessorEventUpsertArgs<ExtArgs>>): Prisma.Prisma__ProcessorEventClient<runtime.Types.Result.GetResult<Prisma.$ProcessorEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProcessorEventCountArgs>(args?: Prisma.Subset<T, ProcessorEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProcessorEventCountAggregateOutputType> : number>;
    aggregate<T extends ProcessorEventAggregateArgs>(args: Prisma.Subset<T, ProcessorEventAggregateArgs>): Prisma.PrismaPromise<GetProcessorEventAggregateType<T>>;
    groupBy<T extends ProcessorEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProcessorEventGroupByArgs['orderBy'];
    } : {
        orderBy?: ProcessorEventGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProcessorEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessorEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProcessorEventFieldRefs;
}
export interface Prisma__ProcessorEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProcessorEventFieldRefs {
    readonly id: Prisma.FieldRef<"ProcessorEvent", 'String'>;
    readonly type: Prisma.FieldRef<"ProcessorEvent", 'String'>;
    readonly authId: Prisma.FieldRef<"ProcessorEvent", 'String'>;
    readonly amountCents: Prisma.FieldRef<"ProcessorEvent", 'Int'>;
    readonly payload: Prisma.FieldRef<"ProcessorEvent", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"ProcessorEvent", 'DateTime'>;
}
export type ProcessorEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    where: Prisma.ProcessorEventWhereUniqueInput;
};
export type ProcessorEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    where: Prisma.ProcessorEventWhereUniqueInput;
};
export type ProcessorEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    where?: Prisma.ProcessorEventWhereInput;
    orderBy?: Prisma.ProcessorEventOrderByWithRelationInput | Prisma.ProcessorEventOrderByWithRelationInput[];
    cursor?: Prisma.ProcessorEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcessorEventScalarFieldEnum | Prisma.ProcessorEventScalarFieldEnum[];
};
export type ProcessorEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    where?: Prisma.ProcessorEventWhereInput;
    orderBy?: Prisma.ProcessorEventOrderByWithRelationInput | Prisma.ProcessorEventOrderByWithRelationInput[];
    cursor?: Prisma.ProcessorEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcessorEventScalarFieldEnum | Prisma.ProcessorEventScalarFieldEnum[];
};
export type ProcessorEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    where?: Prisma.ProcessorEventWhereInput;
    orderBy?: Prisma.ProcessorEventOrderByWithRelationInput | Prisma.ProcessorEventOrderByWithRelationInput[];
    cursor?: Prisma.ProcessorEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcessorEventScalarFieldEnum | Prisma.ProcessorEventScalarFieldEnum[];
};
export type ProcessorEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProcessorEventCreateInput, Prisma.ProcessorEventUncheckedCreateInput>;
};
export type ProcessorEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProcessorEventCreateManyInput | Prisma.ProcessorEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProcessorEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    data: Prisma.ProcessorEventCreateManyInput | Prisma.ProcessorEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProcessorEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProcessorEventUpdateInput, Prisma.ProcessorEventUncheckedUpdateInput>;
    where: Prisma.ProcessorEventWhereUniqueInput;
};
export type ProcessorEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProcessorEventUpdateManyMutationInput, Prisma.ProcessorEventUncheckedUpdateManyInput>;
    where?: Prisma.ProcessorEventWhereInput;
    limit?: number;
};
export type ProcessorEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProcessorEventUpdateManyMutationInput, Prisma.ProcessorEventUncheckedUpdateManyInput>;
    where?: Prisma.ProcessorEventWhereInput;
    limit?: number;
};
export type ProcessorEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    where: Prisma.ProcessorEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProcessorEventCreateInput, Prisma.ProcessorEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProcessorEventUpdateInput, Prisma.ProcessorEventUncheckedUpdateInput>;
};
export type ProcessorEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
    where: Prisma.ProcessorEventWhereUniqueInput;
};
export type ProcessorEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProcessorEventWhereInput;
    limit?: number;
};
export type ProcessorEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcessorEventSelect<ExtArgs> | null;
    omit?: Prisma.ProcessorEventOmit<ExtArgs> | null;
};
export {};
