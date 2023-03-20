# Frameworks

- Nextjs
- Typescript
- Mui

# Known Issues

- Don't use `queryClient.isFetching()`. found a [bug](https://github.com/TanStack/query/issues/3269#issuecomment-1086794885) which needs to be solved. use `useIsFetching()` instead as the community suggested.
