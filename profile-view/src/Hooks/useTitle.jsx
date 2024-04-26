export const useTitle = (children) => {
    document.title = children ? `${children} | PROFILE-VIEW` : 'PROFILE-VIEW'
}