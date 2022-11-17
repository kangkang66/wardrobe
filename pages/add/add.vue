<template>
	<view class="u-page">
		<u--form :model="goodsInfo">
			<view class="u-page__form">
				<u-form-item>
					<u--input placeholder="从这里输入物品名称..." fontSize="20" border="none" prefixIcon="edit-pen" v-model="goodsInfo.name"></u--input>
				</u-form-item>
				
				<u-form-item>
					<u-upload
						:fileList="goodsInfo.images"
						name="1"
						@afterRead="afterRead"
						@delete="deletePic"
						multiple
						:maxCount="1"
						:previewFullImage="true"
					></u-upload>
				</u-form-item>
			</view>
			
			
			<view class="u-page__form">
				<u-form-item label="分类" labelWidth="80" @click="categoryShow = true; hideKeyboard()" >
					<u--input disabled disabledColor="#ffffff" placeholder="选择分类" inputAlign="right" fontSize="12" border="none"   v-model="categoryText"></u--input>
				</u-form-item>
				<u-picker :show="categoryShow" :closeOnClickOverlay="true" ref="uPicker" :columns="categoryColumns" keyName="name" @confirm="categoryConfirm" @change="categoryChangeHandler" @close="categoryShow=false" @cancel="categoryShow=false"></u-picker>
			</view>
			
			<view class="u-page__form">
				<u-form-item label="标签" labelWidth="80"  @click="tagsShow = !tagsShow; hideKeyboard()">
					<u--input disabled disabledColor="#ffffff" placeholder="点击选择标签" inputAlign="right" fontSize="12" border="none" ></u--input>
				</u-form-item>
				<view class="u-demo-block" v-if="tagsShow">
					<view class="u-demo-block__content">
						<view class="u-page__tag-item" v-for="(item, index) in tags" :key="index">
							<u-tag :text="item.name" :plain="!item.checked" :type="item.type" :name="index" @click="tagClick">
							</u-tag>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="u-page__collapse" :accordion="true">
				<u-collapse accordion :border="false" >
					<u-collapse-item title="购买信息（选填）" name="Docs guide" :border="false">
						<view class="u-page__collapse__form">
							<u-form-item label="购买日期" labelWidth="80" @click="buyDatePickerShow=true;hideKeyboard()">
								<u--input disabled disabledColor="#ffffff" placeholder="年-月-日" inputAlign="right" fontSize="12" border="none" v-model="goodsInfo.buy_date"></u--input>
							</u-form-item>
							<u-datetime-picker
									:show="buyDatePickerShow"
									mode="date"
									closeOnClickOverlay
									:value="buyDatePickerValue"
									@confirm="buyDatePickerConfirm"
									@cancel="buyDatePickerShow=false;"
									@close="buyDatePickerShow=false;"
							></u-datetime-picker>
							
							<u-form-item label="价格(元)" labelWidth="80"  >
								<u--input placeholder="请输入价格" type="number" inputAlign="right" fontSize="12" border="none"  v-model.number="goodsInfo.price"></u--input>
							</u-form-item>
							
							<u-form-item label="备注" labelWidth="80"  >
								<u--input placeholder="额外备注" inputAlign="right" fontSize="12" border="none"  v-model="goodsInfo.mark"></u--input>
							</u-form-item>
							
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
			
			
			
			<view class="u-page__button">
				<u-button text="添加物品" loadingText="提交中..." throttleTime="2"
					formType="submit" color="#75b795" shape="circle" @click="submit"
				></u-button>
			</view>
			
		</u--form>
	</view>
</template>

<script>
	import {getSTS,getFormid,goodsAdd,goodsTagSearch,goodsCategorySearch} from "@/common/api.js"
	import COS from "@/common/cos-wx-sdk-v5.js"
	
	export default {
		data() {
			return {
				goodsInfo: {
					name:"",
					images:[],
					product_date: uni.$u.timeFormat(Number(new Date()), 'yyyy-mm-dd'),
					life_year:0,
					life_month:0,
					life_day:7,
					expire_at:"",
					ahead_notify_day:2,
					stock:1,
					stock_unit:"个",
					category:{},
					tags:[],
					specs:"",
					brand:"",
					buy_date:uni.$u.timeFormat(Number(new Date()), 'yyyy-mm-dd'),
					price:0,
					barcode:"",
					batch_no:"",
					mark:"",
				},
				
				categoryShow:false,
				categoryText:"",
				categoryColumns: [],
				categoryColumnData: [],
				
				tagsShow:false,
				tags: [],
				
				buyDatePickerShow:false,
				buyDatePickerValue:Number(new Date()),
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this.goodsInfo.images.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.goodsInfo.images.length
				lists.map((item) => {
					this.goodsInfo.images.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.goodsInfo.images[fileListLen]
					this.goodsInfo.images.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(filePath) {
				return new Promise((resolve, reject) => {
					getSTS().then((res) => {
						var cos = new COS({
							SecretId: res.tmp_secret_id,
							SecretKey: res.tmp_secret_key,
							XCosSecurityToken: res.token
						});
						cos.sliceUploadFile({
							   Bucket: res.bucket, 
							   Region: res.region,
							   Key: res.filename,
							   FilePath: filePath
						   },
						   function(err, data) {
							   if (err != null) {
								   console.log(err)
								   uni.$u.toast("上传失败")
								   return
							   }else{
								   resolve(res.host + "/" + res.filename)
							   }
						   }
						)
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.u-page {
		&__navbar{
			
		}
		
		&__form{
			background-color: white;
			padding: 20rpx;
			border-radius: 10rpx;
			margin: 0rpx 10rpx;
		}
		
		&__collapse{
			background-color: white;
			border-radius: 10rpx;
			margin: 10rpx 10rpx;
			
			&__form{
				margin: 0rpx 30rpx;
			}
		}
		
		&__button{
			margin: 30rpx;
			padding: 50rpx;
		}
		
		&__tag-item {
			margin: 0rpx 10px 20rpx 0rpx;
		}
	}
	
	.u-demo-block__content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}
	
</style>

