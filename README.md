# Interview Creation Portal

# Problem Statement
Create a simple app where admins can create interviews by selecting participants, interview start time and end time.

## Functionality:
An interview creation page where the admin can create an interview by selecting participants, start time and end time. Backend should throw error with proper error message if: 
* Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
* No of participants is less than 2

An interviews list page where admin can see all the upcoming interviews.
An interview edit page where admin can edit the created interview with the same validations as on the creation page.

Admin can delete the interview.

Admin can notify the participants via mail.





1. **Home Page**: The home page contains a list of all upcoming interviews. Here admin can edit and delete the interview and notify participants via email.
![alt text](https://www.linkpicture.com/q/Screenshot-1378.png "Home Page")

2. **Interview Scheduling Page**: This page contains the form to schedule an interview between participants with proper error messages when no of participants is less than 2, start time greater than end time if the same participant is scheduled in another interview at the same time, etc.
![alt text](https://www.linkpicture.com/q/Screenshot-1379.png "Schedule an Interview")
![alt text](https://www.linkpicture.com/q/Screenshot-1380.png "Schedule an Interview")
