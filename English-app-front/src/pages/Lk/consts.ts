import {YesNoBannerProp} from "../../components/Banner/YesNoBanner";

export const PROFILE = "PROFILE"
export const LESSONS = "LESSONS"
export const HOMEWORK = "HOMEWORK"
export const PLAN_CLASS = "PLAN_CLASS"
export const PROGRESS = "PROGRESS"

export const PROFILE_ACTION = "TO_PROFILE"
export const LESSONS_ACTION = "TO_LESSONS"
export const HOMEWORK_ACTION = "TO_HOMEWORK"
export const PLAN_CLASS_ACTION = "TO_SCHEDULE"
export const PROGRESS_ACTION = "TO_PROGRESS"
export const BALANCE_ACTION = "TO_BALANCE"
export const PLACEMENT_TEST_ACTION = "TO_PLACEMENT_TEST"

export const PARENT_PROFILE_ACTION = "TO_PARENT_PROFILE"
export const TEACHER_PROFILE_ACTION = "TO_TEACHER_PROFILE"
export const TEACHER_HOMEWORK_ACTION = "TO_TEACHER_HOMEWORK"
export const TEACHER_CLASS_ACTION = "TO_TEACHER_CLASS"

export const TO_INFORMATION = "TO_INFORMATION"

export const STUDENT_ROLE = "Student"


export interface MenuItem {
    order: number,
    name: string,
    nameEn: string,
    tablerIcon: string,
    action: string
}

export interface GetMenuResponse {
    currentFrame: MenuItem,
    menuItems: MenuItem[],
    yesNoBanner: YesNoBannerProp,
    classesPrepaid?: string
    yourEnglishLevel?: string
}
