from numpy import *
import operator

def createDataSet():
  group = array([[1.0, 1.1], [1.0, 1.0], [0, 0], [0, 0.1]])
  labels = ['A', 'A', 'B', 'B']
  return group, labels

def classify0(inX, dataSet, labels, k):
  dataSetSize = dataSet.shape[0]
  diffMat = tile(inX, (dataSetSize, 1)) - dataSet
  sqDiffMat = diffMat**2
  sqDistances = sqDiffMat.sum(axis=1)
  distances = sqDistances**0.5
  sortedDistIndicies = distances.argsort()
  classCount = {}
  for i in range(k):
    voteILabel = labels[sortedDistIndicies[i]]
    classCount[voteILabel] = classCount.get(voteILabel, 0) + 1
  sortedClassCount = sorted(classCount.iteritems(), key=operator.itemgetter(1), reverse=True)
  return sortedClassCount[0][0]

def file2matrix(filename):
  fr = open(filename)
  lines = fr.readLines()
  numberOfLines = len(lines)
  returnMat = zeros((numberOfLines, 3))
  classLabelVector = []
  index = 0
  for line in lines:
    line = line.strip()
    listFromLine = line.split('\t')
    returnMat[index, :] = listFromLine[0:3]
    classLabelVector.append(int(listFromLine[-1]))
    index += 1
  return returnMat, classLabelVector

