export const useTitle = (children) => {
    document.title = children ? `${children} | Profile-view` : 'PROFILE-VIEW'
}