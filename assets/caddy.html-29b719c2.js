import{_ as i,r as c,o as l,c as r,e as t,a as e,d as a,b as n,f as d}from"./app-09c95c92.js";const o={},u=e("h1",{id:"caddy",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#caddy","aria-hidden":"true"},"#"),a(" Caddy")],-1),p=e("h2",{id:"下载",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#下载","aria-hidden":"true"},"#"),a(" 下载")],-1),v={href:"https://caddyserver.com/download",target:"_blank",rel:"noopener noreferrer"},m=e("code",null,"Linux amd64",-1),b=e("code",null,"http.handlers.webhook",-1),h=d(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>移动下载的二进制文件到 <code>/usr/bin/</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mv</span> caddy_linux_amd64_custom /usr/bin/caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改 <code>caddy</code> 权限</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">755</span> /usr/bin/caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试是否有效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ caddy version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个名为 <code>caddy</code> 的组</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">groupadd</span> <span class="token parameter variable">--system</span> caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个名为 <code>caddy</code> 且有可写的主目录的用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">useradd</span> <span class="token parameter variable">--system</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">--gid</span> caddy <span class="token punctuation">\\</span>
    --create-home <span class="token punctuation">\\</span>
    --home-dir /var/lib/caddy <span class="token punctuation">\\</span>
    <span class="token parameter variable">--shell</span> /usr/sbin/nologin <span class="token punctuation">\\</span>
    <span class="token parameter variable">--comment</span> <span class="token string">&quot;Caddy web server&quot;</span> <span class="token punctuation">\\</span>
    caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>创建一个名为 <code>example.com</code> 的站点目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-m</span> <span class="token number">777</span> /var/www/example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个名为 <code>Caddyfile</code> 的配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mkdir</span> /etc/caddy
$ <span class="token function">sudo</span> <span class="token function">touch</span> /etc/caddy/Caddyfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>example.com, www.example.com {
  root * /var/www/example.com
  file_server

  encode zstd gzip

  route /webhook {
    webhook {
      repo https://github.com/example/foobar.git
      path /var/www/example.com
      branch master
      secret xxx
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>xxx</code> 远程仓库设置中 Webhook 的 Secret</p><h2 id="服务" tabindex="-1"><a class="header-anchor" href="#服务" aria-hidden="true">#</a> 服务</h2>`,20),g={href:"https://raw.githubusercontent.com/caddyserver/dist/master/init/caddy.service",target:"_blank",rel:"noopener noreferrer"},k=e("code",null,"/etc/systemd/system/",-1),x=d(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mv</span> caddy.service /etc/systemd/system/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启用 <code>caddy</code> 服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查是否在运行中</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl status caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5);function f(_,y){const s=c("ExternalLinkIcon");return l(),r("div",null,[u,t(" more "),p,e("p",null,[a("打开 "),e("a",v,[a("下载"),n(s)]),a(" 页面，平台选择 "),m,a(" ，点选 "),b,a(" 模块，然后点击下载按钮")]),h,e("p",null,[e("a",g,[a("下载"),n(s)]),a("服务文件并移动到 "),k]),x])}const $=i(o,[["render",f],["__file","caddy.html.vue"]]);export{$ as default};
