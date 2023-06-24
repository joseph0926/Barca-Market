import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { ApplicationDispatch, ApplicationState } from "../store/store";

export const useAppSelect: TypedUseSelectorHook<ApplicationState> = useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;
