# Code Database _[COMP 424 001 Project]_

Group Members: [Giorgio Montenegro](https://github.com/gmonte29), [Michael Collins](https://github.com/mcollins21), 
[Christian Cooke](https://github.com/ChristianACooke), Emilie Amadi

## About

Code Database aims to create a centralized repository of coding algorithms, 
providing a valuable resource for students and computer science professionals 
alike. The database will encompass a wide range of algorithm types, each 
accompanied by code examples. 

**Target Audience**:

- Students: Code Database will serve as a comprehensive learning tool for 
students enrolled in computer science courses, enabling them to grasp various 
algorithmic concepts and practice their programming skills.
- Computer Science / IT Professionals: Code Database will provide a handy reference 
for experienced programmers, allowing them to quickly access and review 
specific algorithms for their coding projects.

**Key Features**:

1) Comprehensive Coverage: Code Database will ideally cover a broad spectrum 
of coding algorithms, encompassing fundamental concepts like sorting, 
searching, and recursion to more advanced techniques like dynamic programming 
and graph algorithms all from user's code uploads.
2) Code Snippets: Code Database will provide code snippets for each algorithm, 
allowing users to visualize the implementation and gain practical coding 
experience.
3) Search Functionality: To facilitate easy navigation, the site will 
implement a robust search functionality, enabling users to quickly locate 
specific algorithms based on keywords or categories.
4) Regular Community Updates: The site will be continuously updated with new algorithms, 
ensuring its relevance and comprehensiveness over time.

**Impact**:

- Enhanced Learning: Students will have access to a comprehensive resource, 
improving their understanding of algorithm concepts and their ability to apply them 
in programming tasks.
- Productivity Boost: Professionals will have a readily available reference for 
algorithms, streamlining their coding process and enhancing productivity.
- Knowledge Sharing: The community based uploads will foster knowledge exchange and 
collaboration, promoting a vibrant learning environment.

## Initial Setup

**Makefile Summary**

    make install
The install target installs the Express dependency using NPM. 
This ensures that the application has the necessary dependencies installed before 
it can be run.

    make start
The start target starts the Express server by running the server.js 
file. This launches the application and allows it to start receiving requests.

    make clean
The clean target removes the node_modules directory and all files in 
the uploads directory.
