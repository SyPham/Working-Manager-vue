<template>
  <div class="tree">
    <node-tree :node="treeData" @AddSub="handleEvent" :taskID="taskID"></node-tree>
  </div>
</template>

<script>
import NodeTree from "./NodeTree";

export default {
  data() {
    return {
      totalShow: 3
    };
  },
  props: {
    treeData: Object,
    taskID: Number
  },
  components: {
    NodeTree
  },
  methods: {
    handleEvent: function(data) {
      this.$emit("AddSub", this.taskID);
    }
  }
};
</script>

<style>
.comments-section {
  background: #fff;
}
.comment-area {
  background: none repeat scroll 0 0 #fff;
  border: medium none;
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  -ms-border-radius: 4px 4px 0 0;
  -o-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  color: #777777;
  float: left;
  font-family: Lato;
  font-size: 14px;
  height: 85px;
  letter-spacing: 0.3px;
  padding: 10px 20px;
  width: 100%;
  resize: vertical;
  outline: none;
  border: 1px solid #f2f2f2;
}
.comment-btn {
  float: right;
  background: #4caf50;
  margin: 5px 0;
  padding: 6px 15px;
  color: #fff;
  letter-spacing: 1.5px;
  outline: none;
  border-radius: 4px;
  box-shadow: none;
}
.comment-btn:hover,
.comment-btn:focus {
  background: #2e7d32;
  outline: none;
  border-radius: 4px;
  box-shadow: none;
}
.comment-box-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5px 0px;
}
.comment-box {
  display: flex;
  width: 100%;
}
.comment-box a {
  color: #242475;
}
.commenter-image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.comment-content {
  display: flex;
  flex-direction: column;
  background: #f2f3f5;
  margin-left: 5px;
  padding: 4px 20px;
  border-radius: 10px;
}

.commenter-head {
  display: block;
}

.commenter-head .commenter-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.comment-date {
  font-size: 0.7rem;
}
.comment-date i {
  margin: 0 5px 0 10px;
}
.comment-body {
  padding: 0 0 0 5px;
  display: flex;
  font-size: 1rem;
  font-size: 0.8rem;
  font-weight: 400;
}
.comment-footer {
  font-size: 0.8rem;
  font-weight: 600;
}

.comment-footer span {
  margin: 0 15px 0 0;
}
.comment-footer span a {
  margin: 0 0px 0 2px;
}

.comment-footer span.comment-likes .active .fa-heart {
  color: black;
  font-size: 1rem;
}
.comment-footer span.comment-likes .active .fa-heart {
  color: red;
}

.nested-comments {
  margin-left: 50px;
}
</style>