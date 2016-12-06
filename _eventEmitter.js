	function _eventEmitter(){
				var fa={};//存放事件监听函数
				var that={};//存放单次事件监听
				
				//判断是否已经存在该事件
				function cleck0(str,o){
					for(var i in o ){
						if(i==str)
							return true;
					}
					return false;
				}
				
				//注册监听器
				this.on=function(_event,_listener){
					
					const s=cleck0(_event,fa);
					
					if(s){
						//监听器存在则最多可添加10个处理函数
						if(fa[_event].length<=10)
						  	fa[_event].push(_listener);
					}
					else{
						//若不存在则添加新的监听器
						fa[_event]=[];
						fa[_event].push(_listener);
					}
	
				}
				//单次监听器
				this.once=function(_event,_listener){
					this.on(_event,_listener);
					const t=cleck0(_event,that);
					
					if(t){
						//监听器存在继续添加
						that[_event].push(_listener);
					}
					else{
						//若不存在则添加新的监听器
						that[_event]=[];
						that[_event].push(_listener);
					}
				}
				
				//移除指定事件的某个监听器
				this.removeListener=function(_event,_listener){
	
					for(var j in fa[_event] ){
						if(fa[_event][j]==_listener){
							fa[_event].splice(j,1);
						}
					}
				}
	
	
	// ---------------------------------------------
				//移除所有事件的所有监听器，如果指定事件，则移除指定事件的所有监听器
				this.removeAllListener=function(...arr){
					if(arr.length<=0){
						//alert("全删");
	
						for(var m in fa){
							if(fa.hasOwnProperty(m))
							delete fa[m];
						}
					}
					else{
						//alert("删"+arr[0]);
						for(var n in arr){
							if(fa.hasOwnProperty(arr[n]))
							delete fa[arr[n]];
						}
	
					}
				}
	
	//-----------------------------------------------
				//发射事件
				this.emit=function(_event,...args){
					
	
	
					const v=cleck0(_event,fa);
					if(v){
						//依次执行每个处理函数
							for(var a in fa[_event]){
								fa[_event][a](...args);
							}
						//判断是否存在单次监听
						if(that[_event]){
							
							for(var o in that[_event]){
								this.removeListener(_event,that[_event][o]);
							}
						}
						
					}
	                
				}
		}		
			