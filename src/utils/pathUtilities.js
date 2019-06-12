import _ from 'lodash';
import pathVars from './globals';

function PathUtilities(){

    return {
        setPropertyByPath: function(obj, path, value){
            let splitPath = path.split('/').slice(1);
            let index = splitPath.lastIndexOf(pathVars.boardlist);
            splitPath.splice(index, 1);
            splitPath.push(value.url);
             _.set(obj, splitPath, value);
             console.log(typeof object)
             return obj;
        },
        urlPath: function(title){
            return title.toLowerCase().split(" ").join('-');
        }
    }
}

export default PathUtilities;