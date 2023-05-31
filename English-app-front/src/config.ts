/**
 * Выбор роли при регистрации между студентом, учитлем и преподом
 */
export const IS_ROLE_CHOICE_UPON_REGISTRATION = true

/**
 * Заблокировать роль родителя при регистрации
 */
export const IS_PARENT_ROLE_BLOCKED = true

/**
 * Заблокировать роль учителя при регистрации
 */
export const IS_TEACHER_ROLE_BLOCKED = false

/**
 * Показывать историю занятий в разделе "Баланс"
 */
export const IS_SHOW_HISTORY_IN_BALANCE_PAGE = false

/**
 * Показывать ручное пополнение баланса путем прямого перевода физ лицу
 */
export const IS_SHOW_DIRECT_MONEY_TRANSFER_SUGGESTION = false

/**
 * Показывать тестовую версию перевода денег (эквайринга) через юкасу
 */
export const IS_SHOW_TEST_UKASSA_ACQUIRING = true

/**
 * Показывать продакшен версию перевода денег (эквайринга) через юкасу
 */
export const IS_SHOW_PROD_UKASSA_ACQUIRING = false

/**
 * Ключ хеширования
 */
export const SECRET_PASS_HASH = "fdcd836286e75e4366ec3a3000d0b5535f2c72263fc36a43b48444fb02b980de"

/**
 * Соль при хешировании пароля
 */
export const LEFT_SALT_ON_PASS_HASHING = "28ad89b9dce3dd4f9a90a0c7a006f004c2edf9adfaaa1c618470ccb3ae25654c"
/**
 * Базовый урл бекенда
 */
export const baseURL = process.env.REACT_APP_BASE_URL !== undefined ? process.env.REACT_APP_BASE_URL : 'http://localhost:8080/'

export const INFO_LINE = ""