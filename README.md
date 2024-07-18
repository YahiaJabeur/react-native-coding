# RN test

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).



## RN Test

This sample project loads a list of users from a JSON file located in at `assets/MOCK_DATA.json` and display them using a FlatList.

The format of the data is as follows:

```json
    [
        {
            "id":"3e73187d-88c0-4586-81e5-27de6547acad",
            "first_name":"Jess", /* String */
            "last_name":"Potato", /* String */
            "text":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.", /* String */
            "email":"jpinkett0@zdnet.com", /* email address as String */
            "backgroundColor":"#861b5b", /* hex color as String */
            "avatar":"https://robohash.org/occaecatiofficiacum.jpg?size=200x200&set=set1", /* URI as String */
            "avatar_large":"https://robohash.org/occaecatiofficiacum.jpg" /* URI as String */
        },
        ...
    ]
```

NOTE: Assume all values can be `null` except `id`.

## Tasks
 1. Convert Question1.js to Question1.tsx
 2. Convert Question1.tsx class component to a functional component
 3. Implement the option to change from ListView to a GridView.
    * The grid items should have a max_width of half the available width in the device's portrait mode
    * Each element should follow this layout:
       ``` 
        ------------------------
       |  --------------------  |
       | |                    | |
       | |                    | |
       | |                    | |
       | |       AVATAR       | | (padding == 10)
       | |                    | |
       | |                    | |
       | |                    | |
       | |                    | |
       |  --------------------  |
       |                        |
       |       Full  Name       | (Centered)
       |                        |
       |      email address     | (Centered)
       |                        |
        ------------------------
       ```
       Full Name = {first_name} + {last_name} 
       background color = {backgroundColor}

 4. Implement the Two sorting options (defined in the action): 
    * Sort last name ascending 
    * Sort last name descending
 
 5. Implement the Filter out users that have `null` *`avatar_large`*

 6. Update the code to fetch the data from a URL instead of loading from the `assets` folder.

    The list of users is paginated and available at [here](https://gist.githubusercontent.com/dsandin/c8ed6c5a9486f311f4725f221b912220/raw/8c6d2d8e1f339d02e0ff3d2990560a4862c4beae/users_page_list):

    Format:
    ```JSON
    {
        "pages": [
            "https://gist.githubusercontent.com/dsandin/7b7cd2b834abd8c10908803cac5d1dd3/raw/9a8c0270e0f7a778409b2996419bacdbb06edc87/users_page1",
            "https://gist.githubusercontent.com/dsandin/e451f042d2b78143141ea8ea7d97b03f/raw/9847b174d0f5f61701ad64ab73be568270eea3a3/users_page2",
            "https://gist.githubusercontent.com/dsandin/459ac3c73b5ea2a2c0b09015de85d930/raw/fc8af8115057bec36561e799aaf5a47ca12521b8/users_page3"
            ]
    }
    ```

 7. Can you create Unit tests for your code? if not, please provide reason 

 ## BONUS

 1. Use REDUX to store the app state
 2. Use a REDUX side effects library to perform async operations
 3. Implement state persistency
 4. Paginate the fetching of the list of users. Only fetch remotely when getting to the end of the elements displayed in the FlatList
