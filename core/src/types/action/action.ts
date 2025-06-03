export type ActionContext = {
    editor: any;
    event?: Event;
    blockId?: number;
    [key: string]: any;
};

export interface Action {
    id: string;
    name: string;
    description?: string;
    shortcut?: string[];
    enabled?: boolean;
    execute: (context: ActionContext) => void | Promise<void>;
}

export interface ActionRegistry {
    [key: string]: Action;
}

export type ActionHandler = (context: ActionContext) => void | Promise<void>;


