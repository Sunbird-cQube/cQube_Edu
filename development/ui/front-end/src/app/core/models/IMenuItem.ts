export interface IMenuItem {
    label: string;
    icon: string;
    path: string;
    basepath: string;
    hasSub: boolean;
    children?: IMenuItem[];
    isSelected: boolean;
}