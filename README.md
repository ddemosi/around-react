# Around the U.S. Project AROUND-REACT (Project 11)!
--------------------------------
### A "not as simple as it once was" ReactJS project for the Web Dev program at Practicum by Yandex

Mostly there:

* Couldn't figure out how to get the form validation set up. I didn't see it on the project requirement checklist, so I didn't finish adding it. Weird errors between JSX and vanilla, I think.
* I did get the "confirm delete popup" working, as well as the loading icons.
* Needs more cowbell

DRAFT 2

* Formatted code with the magic shortcut
* Fixed the needless states inside EditProfilePopup. Guess I didn't full understand "Context" when I wrote that bit.
* Fixed the issue with the delete button not rendering properly when a new card is made. I was looping over the data before I converted it the proper format for the Card component.
* When I fixed the rendering issue with the cards, it solved the "delete" button issue. The owner._id is stored in the card data, so it wasn't necessary to use a Promise.all and/or nested query to fix the issue.

DRAFT 3

* Switched the useEffect in App.js to a chained promise/nested query instead of multiple function calls.
* Removed unnecessary code from EditProfile
* Added catch blocks to promises

DRAFT 4

* Looks like I forgot to set the like handler response to the proper naming convention. Everything looks good after the fixing that!

Link to live site:
https://ddemosi.github.io/around-react/

Created with ReactJS

### Enjoy!
