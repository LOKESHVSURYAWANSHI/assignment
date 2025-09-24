# Blog Filter Implementation TODO

## Plan Summary
Add a filter to the Dashboard component to show only the user's own blogs by toggling a UI element.

## Steps to Complete
1. **Add Filter State**: Add `showMyBlogs` state variable in Dashboard.tsx.
2. **Add Filter UI**: Add a checkbox or toggle button above the blogs list to enable/disable the filter.
3. **Implement Filtering Logic**: Create `filteredBlogs` array based on `showMyBlogs` and `user?.name`.
4. **Update Rendering**: Use `filteredBlogs` in the blogs display section and update the "No blogs found" message.
5. **Handle Edge Cases**: Ensure filter is disabled if user is not logged in and resets on data refresh.

## Progress
- [x] Step 1: Add Filter State
- [x] Step 2: Add Filter UI
- [x] Step 3: Implement Filtering Logic
- [x] Step 4: Update Rendering
- [x] Step 5: Handle Edge Cases

## Task Complete
The blog filter has been successfully implemented in Dashboard.tsx. Users can now toggle to show only their own blogs.
