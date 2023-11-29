class Solution(object):

    #92.17% time complexity, 81.18% space complexity solution for LeetCode 435
    #https://leetcode.com/problems/non-overlapping-intervals/


    def eraseOverlapIntervals(self, intervals):
        
        intervals.sort(key=lambda intervals: intervals[0])
        
        count = 0
        currentEnd = intervals[0][1]
        
        for i in range(1,len(intervals)):
            temp = intervals[i]
            
            if currentEnd > temp[0]:
                count+=1
                currentEnd = min(currentEnd, temp[1])
                
            else:
                currentEnd = temp[1]
                
        return count
