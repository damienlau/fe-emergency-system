<template>
	<div style="overflow-x: auto">
		<v-stage :config="configKonva" class="stage" ref="stage">
			<v-layer>
				<!-- <ReactPage :config="{x: 809,y: 0,width: 152,height: 12,fill: 'rgba(255, 255, 255, 0.38)'}" ref="line_2" /> -->
				<ReactPage :config="{x: 997,y: 0,width: 108,height: 50,fill: '#5B0B14'}" txt="物料架" ref="num_110" />
				<ReactPage :config="{x: 1105,y: 50,width: 50,height: 82,fill: '#9E3642'}" txt="8" ref="num_8" />
				<ReactPage :config="{x: 1105,y: 132,width: 50,height: 82,fill: '#9E3642'}" txt="7" ref="num_7" />
				<ReactPage :config="{x: 1105,y: 214,width: 50,height: 82,fill: '#9E3642'}" txt="6" ref="num_6" />
				<ReactPage :config="{x: 1105,y: 350,width: 50,height: 82,fill: '#138DBF'}" txt="5" ref="num_5" />
				<ReactPage :config="{x: 1105,y: 432,width: 50,height: 82,fill: '#138DBF'}" txt="4" ref="num_4" />
				<ReactPage :config="{x: 1105,y: 514,width: 50,height: 176,fill: '#AF7397'}" txt="3" ref="num_3" />
				<ReactPage :config="{x: 1105,y: 690,width: 50,height: 167,fill: '#AF7397'}" txt="2" ref="num_2" />
				<ReactPage :config="{x: 919,y: 807,width: 186,height: 50,fill: '#0E518F'}" txt="1" ref="num_1" />
				<!-- <ReactPage :config="{x: 662,y: 845,width: 174,height: 12,fill: 'rgba(255, 255, 255, 0.38)'}" ref="line_1" /> -->
				<ReactPage :config="{x: 905,y: 199,width: 40,height: 60,fill: '#0F4C8C'}" txt="9" ref="num_9" />
				<ReactPage :config="{x: 905,y: 259,width: 40,height: 60,fill: '#0F4C8C'}" txt="10" ref="num_10" />
				<ReactPage :config="{x: 905,y: 383,width: 40,height: 60,fill: '#B3A01F'}" txt="11" ref="num_11" />
				<ReactPage :config="{x: 905,y: 443,width: 40,height: 60,fill: '#019448'}" txt="12" ref="num_12" />
				<ReactPage :config="{x: 865,y: 567,width: 80,height: 60,fill: '#A7AAAA'}" txt="13" ref="num_13" />

				<BluePage :config="{x: 865,y: 443,width: 40,height: 60,fill: '#1270C7'}" txt="14" ref="num_14" />
				<BluePage :config="{x: 865,y: 383,width: 40,height: 60,fill: '#1270C7'}" txt="15" ref="num_15" />

				<ReactPage :config="{x: 865,y: 259,width: 40,height: 60,fill: '#138DBF'}" txt="16" ref="num_16" />
				<ReactPage :config="{x: 865,y: 199,width: 40,height: 60,fill: '#138DBF'}" txt="17" ref="num_17" />
				<BluePage :config="{x: 696,y: 0,width: 82,height: 50,fill: '#0F64B5'}" txt="18" ref="num_18" />
				<BluePage :config="{x: 614,y: 0,width: 82,height: 50,fill: '#0F64B5'}" txt="19" ref="num_19" />
				<BluePage :config="{x: 532,y: 0,width: 82,height: 50,fill: '#0F64B5'}" txt="20" ref="num_20" />
				<BluePage :config="{x: 450,y: 0,width: 82,height: 50,fill: '#0F64B5'}" txt="21" ref="num_21" />
				<BluePage :config="{x: 368,y: 0,width: 82,height: 50,fill: '#0F64B5'}" txt="22" ref="num_22" />
				<BluePage :config="{x: 318,y: 147,width: 50,height: 82,fill: '#0F64B5'}" txt="23" ref="num_23" />

				<BluePage :config="{x: 515,y: 208,width: 40,height: 60,fill: '#0F64B5'}" txt="24" ref="num_24" />
				<BluePage :config="{x: 515,y: 268,width: 40,height: 60,fill: '#0F64B5'}" txt="25" ref="num_25" />
				<BluePage :config="{x: 515,y: 328,width: 40,height: 60,fill: '#0F64B5'}" txt="26" ref="num_26" />
				<BluePage :config="{x: 515,y: 388,width: 40,height: 60,fill: '#0F64B5'}" txt="27" ref="num_27" />

				<BluePage :config="{x: 231,y: 229,width: 87,height: 50,fill: '#0F64B5'}" txt="28" ref="num_28" />
				<BluePage :config="{x: 149,y: 229,width: 82,height: 50,fill: '#0F64B5'}" txt="29" ref="num_29" />

				<BluePage :config="{x: 275,y: 464,width: 82,height: 50,fill: '#0F64B5',rotation:30}" txt="30"
					ref="num_30" />
				<BluePage :config="{x: 204,y: 423,width: 82,height: 50,fill: '#0F64B5',rotation:30}" txt="31"
					ref="num_31" />

				<BluePage :config="{x: 73,y: 510,width: 82,height: 46,fill: '#0F64B5',rotation:-48}" txt="32"
					ref="num_32" />

				<!-- <ReactPage :config="{x: 83,y: 568,width: 70,height: 54,fill: '#0F64B5',rotation:30}"  txt="33" ref="num_33" /> -->

				<BluePage :config="{x: 75,y: 562,width: 79,height: 55,fill: '#0F64B5',rotation:30}" txt="33" :skewX="10"
					:skewY="0" :isdiy="true" ref="num_33" />
				<BluePage :config="{x:143,y: 601,width: 79,height: 55,fill: '#0F64B5',rotation:30}" txt="34" :skewX="0"
					:skewY="10" :isdiy="true" ref="num_34" />

				<BluePage :config="{x: 222,y: 669,width: 82,height: 50,fill: '#0F64B5',rotation:17}" txt="35"
					ref="num_35" />
				<BluePage :config="{x: 300,y: 693,width: 82,height: 50,fill: '#0F64B5',rotation:17}" txt="36"
					ref="num_36" />
				<BluePage :config="{x: 378,y: 717,width: 82,height: 50,fill: '#0F64B5',rotation:17}" txt="37"
					ref="num_37" />
				<BluePage :config="{x: 457,y: 741,width: 82,height: 50,fill: '#0F64B5',rotation:17}" txt="38"
					ref="num_38" />


				<BluePage :config="{x:615,y: 328,width: 40,height: 60,fill: '#0F64B5'}" txt="39" ref="num_39" />
				<BluePage :config="{x:615,y: 268,width: 40,height: 60,fill: '#0F64B5'}" txt="40" ref="num_40" />
				<BluePage :config="{x:615,y: 208,width: 40,height: 60,fill: '#0F64B5'}" txt="41" ref="num_41" />


				<BluePage :config="{x:513,y: 567,width: 140,height: 40,fill: '#0F64B5',rotation:20}" txt="42"
					ref="num_42" />


			</v-layer>

		</v-stage>
		<div class="legend">
			<div class="item" v-for="(item,index) in 10" :key="index">
				<div  class="tag" @mouseover="handleOver(index)" @mouseout="handleOut(index)"></div>
			{{tags[index]}}
			</div>
		</div>
	</div>
</template>

<script>
	import ReactPage from './reactPage.vue'
	import BluePage from './bluePage.vue'
 
	
	export default {
		components: {	 
			ReactPage,
			BluePage
		},
		data() {
			return {
				canvas: null,
				configKonva: {
					width: 1155,
					height: 857
				},
				tags: [
					'门诊/超声/清创/留观', '隔离/防疫', '重症/急救', '物料架', '手术', '指挥', '住院', '耗材', '检验/消毒/药剂/放射', '后勤'
				],
				group: [
					[],
					[11],
					[6, 7, 8],
					[110],
					[2, 3],
					[12],
					[16, 17, 4, 5],
					[13],
					[9, 10],
					[14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
						40, 41, 42
					]
				]
			};
		},
		computed: {
		
		},
		mounted() {
			this.$refs.stage.getNode().container().style.cursor = 'pointer';
			this.$refs.stage.getNode().container().style.backgroundColor = '#051D33'
			this.$refs.stage.getNode().container().style.width = '1155px'
		},
		methods: {
			handleOver(index) {
				console.log(index)
				if (this.group[index].length > 0) {
					for (let i in this.group[index]) {
						let ref = 'num_' + this.group[index][i]
						this.$refs[ref].handleMouseDown('legend')
					}
				}
			},
			handleOut(index) {
				console.log(index)
				if (this.group[index].length > 0) {
					for (let i in this.group[index]) {
						let ref = 'num_' + this.group[index][i]
						this.$refs[ref].handleMouseDown('legend')
					}
				}
			}
		}
	};
</script>

<style lang="less">
	.stage {
		background-image: url(../../../../../assets/img_warehouse_map.png);
		background-repeat: no-repeat;
		margin-left: 200px;
	}

	.legend {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 400px;
		position: absolute;
		bottom: 30px;
	}

	.legend .item {
		display: flex;
		align-items: center;
		color: rgba(255, 255, 255, 0.9);
		width: 50%;
		font-size: 12px;
		margin: 5px 0;

	}

	.legend .item .tag {
		width: 50px;
		height: 12px;
		border-radius: 6px;
		border: 1px solid #FFFFFF;
		margin-right: 8px;
		cursor: pointer;
	}

	.legend .item .tag:hover {
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.5) inset;
	}

	.legend .item:nth-child(1) .tag {
		background-color: #019183;
	}

	.legend .item:nth-child(2) .tag {
		background-color: #988D0F;
	}

	.legend .item:nth-child(3) .tag {
		background-color: #9E323A;
	}

	.legend .item:nth-child(4) .tag {
		background-color: #5B080F;
	}

	.legend .item:nth-child(5) .tag {
		background-color: #AF7092;
	}

	.legend .item:nth-child(6) .tag {
		background-color: #019143;
	}

	.legend .item:nth-child(7) .tag {
		background-color: #138ABA;
	}

	.legend .item:nth-child(8) .tag {
		background-color: #A7A7A5;
	}

	.legend .item:nth-child(9) .tag {
		background-color: #0B4173;
	}

	.legend .item:nth-child(10) .tag {
		background-color: #126DC2;
	}
</style>
