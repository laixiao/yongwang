<style scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}

	.Menu {
		background: black;
		display: flex;
		justify-content: space-between;
	}

	.layout-logo {
		position: relative;
		float: left;
		left: 0px;
		height: 90%;
	}

	.layout-nav {
		margin: 0 auto;
		margin-right: 20px;
	}

	.sider-left {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.sider-search {
		width: 150px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		color: white;
		margin: 10px 0 10px 25px;
	}

	.topbar {
		display: flex;
		width: 100%;
		height: 70px;
		justify-content: space-between;
		align-items: center;
	}

	.topbar_tab1 {
		margin-left: 15px;
	}

	.topbar_tab2 {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.topbar_tab2_qr {
		width: 350px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		padding: '4px';
		minHeight: '280px';
		background: '#fff';
		display: flex;
		justify-content: space-between;
	}

	.content_d1 {
		flex-grow: 1;
	}

	.content_d2 {
		flex-grow: 0;
		position: relative;
	}

	.content_d2_img {
		width: 328px;
		height: 664px;
		margin-right: 10px;
	}

	 /*	右边预览 */
	.preview {
		background-image: url(../images/phone16.png);
		background-size: 100%;
		display: flex;
		justify-content: center;
	}
	.iframe {
		position: absolute;
		left: 16px;
		top: 75px;
		width: 295px;
		height: 510px;
	}
	.download-bt {
		position: absolute;
		left: 139px;
		bottom: 25px;
		width: 50px !important;
		height: 50px !important;;
	}
	.qr_div{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		display: flex;
		justify-content: center;
	}
	#qr_canvas{
		left: 139px;
		top: 25px;
	}
	
</style>
<template>
	<div class="layout">
		<Layout>
			<Header style="background: black;">
				<Menu @on-select="clickTopItem" mode="horizontal" theme="dark" class="Menu" active-name="0">
					<img src="../images/logo.png" class="layout-logo" />
					
					<div class="layout-nav">
						<MenuItem name="1">
						<Icon type="ios-cloud-upload" /> 贡献代码片
						</MenuItem>
						<MenuItem name="2">
						<Icon type="ios-book" /> 极简API
						</MenuItem>
						<MenuItem name="3">
							<Icon type="logo-github" /> Github
						</MenuItem>
						<MenuItem name="4">
						<Icon type="ios-heart" /> 支持
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Layout>
				<!-- 左边列表 -->
				<Sider hide-trigger :style="{background: '#fff'}" class="sider-left">
					<Menu theme="light" width="200px" @on-select="clickItem" :open-names="['0']" active-name="0-0">
						<Input search placeholder="输入关键字" class="sider-search" @on-focus="search_focus"/>
						<Submenu v-for="(item, index) in codeArry" :name="item.name">
							<template slot="title">
								<Icon :type="item.icon"></Icon>
								{{item.title}}
							</template>
							<MenuItem v-for="(item2, index2) in item.items" :name="item2.name">{{item2.title}}</MenuItem>
						</Submenu>
					</Menu>
				</Sider>
				 <!--	中间和右边 -->
				<Layout :style="{padding: '0 0px 10px'}">
					<div class="topbar">
						<Breadcrumb class="topbar_tab1">
							<BreadcrumbItem to="/">
								<Icon :type="codeArry[i0].icon"></Icon> {{codeArry[i0].title}}</BreadcrumbItem>
							<BreadcrumbItem> {{codeArry[i0].items[i1].title}}</BreadcrumbItem>
						</Breadcrumb>
						<div class="topbar_tab2">
							<Button type="primary" shape="circle" icon="md-refresh" style="margin-right: 20px;" @click="reset">重置</Button>
							<Button type="primary" shape="circle" icon="md-copy" v-clipboard:success="onCopy" v-clipboard:error="onError" v-clipboard:copy="codeArry[i0].items[i1].code">一键复制</Button>
							<div class="topbar_tab2_qr">
								<Button type="dashed" @click="preview_bt">
									<Icon type="md-qr-scanner" /> 预览二维码</Button>
							</div>
						</div>
					</div>

					<Content class="content">
						<!-- 中部代码区域 -->
						<div class="content_d1">
							<MonacoEditor height="600" language="typescript" theme="vs" :code="codeArry[i0].items[i1].code" :editorOptions="options"
							    @mounted="onMounted" @codeChange="onCodeChange">
							</MonacoEditor>
						</div>
						<div class="content_d2">
							<img class="content_d2_img" src="../images/phone16.png" />
							<iframe class="iframe" :src="'http://'+host+'/' + codeArry[i0].items[i1].gameurl"></iframe>
							<Button class="download-bt" icon="ios-download-outline" type="info" shape="circle" @click="downloadbt"></Button>
							<div class="qr_div" v-show="showQr" @click="preview_bt">
								<canvas id="qr_canvas"></canvas>
							</div>
						</div>
					</Content>
				</Layout>
				
			</Layout>
		</Layout>
	</div>
	
</template>
<script>
	import MonacoEditor from 'vue-monaco-editor';
	import QRCode from 'qrcode';

	export default {
		components: {
			MonacoEditor,QRCode
		},
		data() {
			return {
				host: window.location.host,
				options: {
					selectOnLineNumbers: false
				},
				i0: 0,
				i1: 0,
				codeArry: [{
						name: '0',
						title: '开始',
						icon: 'ios-navigate',
						items: [{
								name: '0-0',
								title: '提示',
								code: [
									'function x() {',
									'\tconsole.log("Hello!1111111111111111");',
									'}'
								].join('\n'),
								gameurl: 'games/Toast/web-mobile/index.html',
							},
							{
								name: '0-1',
								title: 'Action',
								code: [
									'function x() {',
									'\tconsole.log("Hello 2222222222222!");',
									'}'
								].join('\n'),
								gameurl: 'games/Action/web-mobile/index.html',
							},
						]
					},
					{
						name: '1',
						title: '微信小游戏',
						icon: 'ios-navigate',
						items: [{
								name: '1-0',
								title: 'Toast',
								code: [
									'function x() {',
									'\tconsole.log("Hello 33333333333!");',
									'}'
								].join('\n'),
								gameurl: 'games/RichText/web-mobile/index.html',
							},
							{
								name: '1-1',
								title: 'Action',
								code: [
									'function x() {',
									'\tconsole.log("Hello 444444444444444!");',
									'}'
								].join('\n'),
								gameurl: 'games/Action/web-mobile/index.html',
							},
						]
					}
				],
				showQr: false,
				EmailData: '',
				
			}
		},
		methods: {
			onMounted(editor) {
				this.editor = editor;
			},
			onCodeChange(editor) {
				// console.log(this.editor.getValue());
			},
			clickTopItem(e) {
				switch (e){
					case '1':
						window.open("https://github.com/laixiao/yongwang/pulls");
						break;
					case '2':
						window.open("https://game.zuiqiangyingyu.net/wb_webview/common/doc/api/index.html");
						break;
					case '3':
						window.open("https://github.com/laixiao/yongwang");
						break;
					case '4':
						this.$Message.warning('开发中...');
						break;
						
					default:
						break;
				}
			},
			clickItem(e) {
				// console.log("=========", e);
				var arry = e.split('-');
				this.i0 = parseInt(arry[0]);
				this.i1 = parseInt(arry[1]);
				this.editor.setValue(this.codeArry[this.i0].items[this.i1].code)
			},
			reset() {
					this.editor.setValue(this.codeArry[this.i0].items[this.i1].code)
					this.$Message.success('重置成功');
			},
			search_focus(){
					this.$Message.warning('搜索功能暂未开放');
			},
			downloadbt() {
				window.open('https://laixiao.github.io/yongwang/CocosCode/zip/RichText.zip')
			},
			preview_bt(){
				//本地预览：	'http://'+host+'/' + codeArry[i0].items[i1].gameurl
				//线上预览：	'https://'+this.host+'/yongwang/CocosCode/'+this.codeArry[this.i0].items[this.i1].gameurl
				if(this.showQr){
					this.showQr = false;
				}else{
					this.showQr = true;
					this.$Notice.open({
							title: '打开手机，扫码预览',
					});
					var txt = 'https://'+this.host+'/yongwang/CocosCode/'+this.codeArry[this.i0].items[this.i1].gameurl;
					QRCode.toCanvas(document.getElementById('qr_canvas'), txt, function (error) {
						if (error){
							console.error(error)
						}
					})
				}
			},
			onCopy: function (e) {
					this.$Message.success('复制成功');
			},
			onError: function (e) {
					this.$Message.error('复制失败,请刷新重试');
			},
			sendEmail(){
					var objFrm = document.frmEmail; 
					var objFrmOutLook = document.frmEmailOutLook; 
					var msg = ""; 
					msg += "姓名: " + objFrm.name.value + "  "; 
					msg += "电话: " + objFrm.phone.value + "  "; 
					msg += "网址: " + objFrm.website.value + "  "; 
					msg += "主题: " + objFrm.subject.value + "  "; 
					msg += "内容: " + objFrm.message.value + "  "; 
					objFrmOutLook.message.value = msg; 
					objFrmOutLook.action = "mailto:2515097216@qq.com?subject=" + objFrm.subject.value; 
					objFrmOutLook.submit(); 
			}

			

		}
	}
</script>
