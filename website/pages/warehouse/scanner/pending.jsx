// 出/归仓扫描

import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Icon, Modalpending } from "website/components";

export default defineComponent({
  setup() {
    const store = useStore();
	// 待出仓标题及数据展示
	const pengdingDelivery = ref({
		label:"待出仓物资",
		type:"string",
		key:"pengding"
	});
	// 已出仓标题及数据展示
	const finishedDelivery = ref({
		label:"已出仓物资",
		type:"string",
		key:"finished"
	});
	// 模态框表单数据
	const formData = ref({});	
	//扫描出仓模态框是否可见
	const visible  = ref(false);
	//扫描出仓模态框控制
	const handleClickPendingItem = (activedItemkey)=>{
		visible.value = !visible.value;
	}
		
	const titileColumn = ref([
	  {
	    label: "符合清单物资",
			key: "1",
			count:5
	  },
	  {
	    label: "未符合清单物资",
			key: "2",
			count:10
	  },
	  {
	    label: "未扫描到的物资",
			key: "3",
			count:20
	  },
	]);
	// 菜单列表空状态
	const menuEmpty = ref(true);	
	// 菜单列表当前激活值
	const menuActiveKey = ref(titileColumn.value[0].key);	
	// 监听模态框表单提交事件
	const handleSubmitForm = () => {
	  console.log(formData.value);
	  visible.value = !visible.value;
	};
    onMounted(() => {
      // 获取待出仓物资
     //  store
     //    .dispatch("")
     //    .then((response) => {
     //      pengdingDelivery.value[0].options = response.map((option) => {
     //        return {
     //          key: option.id,
			  // title: option.title,
			  // page: option.page,
     //          url: option.url,
			  // content: option.content,
     //        };
     //      });
     //    });
    });
	
    return () => (
      <>
		{/* 出仓扫描 */}
		<div class="h-full flex">
			{/* 出仓扫描-待出仓物资 */}
			<div class="flex-1">
				<a-layout class="h-full bg-navy-4">
					<a-layout-header class="h-64 bg-navy-4 flex items-center justify-center text-18 text-white border-b border-navy-1">			 
						<div>{pengdingDelivery.value.label}</div>
					</a-layout-header>
					<a-layout-content class="ml-16 h-full overflow-y-auto">
					    <div class="mt-16">
							<div class="mb-16 mr-8 bg-navy-2 h-modal-lightmin">
								<div class="h-64 flex items-center justify-center text-white border-b border-navy-1">
									<div class="flex items-center justify-center">
										<span class="text-20">川-后勤-001</span>										
										<span class="text-success" >(20/20)</span>
									</div>
								</div>
								<div class="flex py-16 px-16">
									<div class=" h-modal-lightermin w-modal-lightermin bg-white">
										<img />
									</div>
									<div class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1">
										<div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center">
											<span class="text-14 w-full overflow-hidden h-22">单兵头盔</span>
										</div>	
										<br/>
										<br/><br/><br/><br/><br/><br/><br/><br/>
										<br/><br/><br/><br/><br/><br/><br/><br/>
										<br/><br/><br/><br/><br/>
										<div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center" >
											<span class="text-14 w-full overflow-hidden h-22"></span>
										</div>
									</div>
								</div>	
							</div>
					    </div>
					</a-layout-content>		    
				</a-layout>
			</div>
			{/* 出仓扫描-图标箭头 */}
			<Icon style="font-size:76px;color:#0e518f;width:140px;" class="flex items-center justify-center" type="arrow-right-filling" />
			{/* 出仓扫描-已出仓物资 */}
			<div class="flex-1">
				<a-layout class="h-full bg-navy-4">
					<a-layout-header class="h-64 bg-navy-4 flex items-center justify-center text-18 text-white border-b border-navy-1 relative">			 
						<div>
							{finishedDelivery.value.label}
							
						</div>
						<div class="absolute right-5">
							<Tabs>
								<a-button type="primary" onClick={() => handleClickPendingItem()}>
									扫描完成
								</a-button>
							{/* 卡片容器 */}
							</Tabs>
						</div>
					</a-layout-header>
					<a-layout-content class="ml-16 h-full overflow-y-auto">
					    <div class="mt-16">
							<div class="mb-16 mr-8 bg-navy-2 h-modal-lightmin">
								<div class="h-64 flex items-center justify-center text-white border-b border-navy-1">
									<div class="flex items-center justify-center">
										<span class="text-20">川-后勤-001</span>										
										<span class="text-success" >(20/20)</span>
									</div>
								</div>
								<div class="flex py-16 px-16">
									<div class=" h-modal-lightermin w-modal-lightermin bg-white">
										<img />
									</div>
									<div class="bg-navy-4 ml-16 overflow-y-auto h-modal-lightermin flex-1">
										<div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center">
											<span class="text-14 w-full overflow-hidden h-22">单兵头盔</span>
										</div>	
										<br/>
										<br/><br/><br/><br/><br/><br/><br/><br/>
										<br/><br/><br/><br/><br/><br/><br/><br/>
										<br/><br/><br/><br/><br/>
										<div class="h-54 ml-16 mr-16 border-b border-navy-1  flex items-center" >
											<span class="text-14 w-full overflow-hidden h-22"></span>
										</div>
									</div>
								</div>	
							</div>
							<br/>
							<br/><br/><br/><br/><br/><br/><br/><br/>
							<br/><br/><br/><br/><br/><br/><br/><br/>
							<br/><br/><br/><br/><br/><br/><br/><br/>
							<br/><br/><br/><br/><br/><br/><br/><br/>
					    </div>
					</a-layout-content>		    
				</a-layout>
			</div>
		</div>		
		{/* 扫描出仓模态框 */}
		<Modalpending
		  v-model={[visible.value, "visible"]}
		  size="heavy"
			title="出仓扫描清单"
			menus={titileColumn.value}
			menuActiveKey={menuActiveKey.value}
			menuEmpty={menuEmpty.value}		
		>
		  <a-button ghost html-type="submit" onClick={handleSubmitForm}>		          
				返回扫描
			</a-button>
			<a-button ghost html-type="submit" onClick={handleSubmitForm}>		          
				确定出仓
			</a-button>

		</Modalpending>
      </>
    );
  },
});
