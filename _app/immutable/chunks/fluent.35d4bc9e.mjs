import{S as Es,i as js,s as Ls,k as t,r,a as l,l as o,m as e,u as d,h as n,c as k,p as u,b as p,F as c,n as ss}from"./index.73c741f7.mjs";function Ns(ys){let i,h,V,R,v,L,W,J,m,gs=`<code class="language-java"><span class="token keyword">package</span> <span class="token namespace">windows</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">&#123;</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		
		<span class="token class-name">FrameBuilder</span> frameBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FrameBuilder</span><span class="token punctuation">(</span><span class="token string">"A"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">Frame</span> frame <span class="token operator">=</span> frameBuilder
			<span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token string">"Frame A"</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">section</span><span class="token punctuation">(</span><span class="token string">"content"</span><span class="token punctuation">)</span>
				<span class="token punctuation">.</span><span class="token function">section</span><span class="token punctuation">(</span><span class="token string">"header"</span><span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">label</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span>
					<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">section</span><span class="token punctuation">(</span><span class="token string">"body"</span><span class="token punctuation">)</span>
				<span class="token punctuation">.</span><span class="token function">button</span><span class="token punctuation">(</span><span class="token string">"World!"</span><span class="token punctuation">)</span>
				<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">String</span> generated <span class="token operator">=</span> frame<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Output generated code:"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>generated<span class="token punctuation">)</span><span class="token punctuation">;</span>		
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,H,w,B,X,O,_,N,K,M,y,fs=`<code class="language-java"><span class="token keyword">package</span> <span class="token namespace">windows</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FrameBuilder</span> <span class="token punctuation">&#123;</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">FrameBuilder</span><span class="token punctuation">></span><span class="token punctuation">></span></span> sections <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">FrameBuilder</span><span class="token punctuation">></span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> title <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> width <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> height <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">FrameBuilder</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">FrameBuilder</span> <span class="token function">title</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">FrameBuilder</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token keyword">int</span> width<span class="token punctuation">,</span> <span class="token keyword">int</span> height<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> width<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height<span class="token punctuation">;</span>
		
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FrameBuilder</span><span class="token punctuation">></span></span> <span class="token function">section</span><span class="token punctuation">(</span><span class="token class-name">String</span> label<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FrameBuilder</span><span class="token punctuation">></span></span> sectionBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FrameBuilder</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>label<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>sectionBuilder<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">return</span> sectionBuilder<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token keyword">public</span> <span class="token class-name">Frame</span> <span class="token function">collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token class-name">Frame</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Frame</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FrameBuilder</span><span class="token punctuation">></span></span> s <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
			f<span class="token punctuation">.</span><span class="token function">addSection</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">&#125;</span>
		
		<span class="token keyword">return</span> f<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
<span class="token punctuation">&#125;</span></code>`,G,F,A,Q,I,g,bs=`<code class="language-java"><span class="token keyword">package</span> <span class="token namespace">windows</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @param &lt;T> Pile of types
 *  - FrameBuilder for root
 *  - SectionBuilder&lt;...> for sub levels
 *  
 *  T = parent object
 *  SectionBuilder&lt;T> = current type
 *  SectionBuilder&lt;SectionBuilder&lt;T>> = sub sections type
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">&#123;</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">T</span> parent <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span><span class="token punctuation">></span></span> sections <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> label<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> button<span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">SectionBuilder</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">T</span> parent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> parent<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">label</span><span class="token punctuation">(</span><span class="token class-name">String</span> label<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>label <span class="token operator">=</span> label<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">button</span><span class="token punctuation">(</span><span class="token class-name">String</span> button<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>button <span class="token operator">=</span> button<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token keyword">public</span> <span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">section</span><span class="token punctuation">(</span><span class="token class-name">String</span> label<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span></span> sectionBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span></span><span class="token punctuation">(</span>label<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>sectionBuilder<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">return</span> sectionBuilder<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">Section</span> <span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">String</span> parentName<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token class-name">Section</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Section</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>label<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>button<span class="token punctuation">,</span> parentName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">SectionBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SectionBuilder</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span><span class="token punctuation">></span></span> s <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
			f<span class="token punctuation">.</span><span class="token function">addSection</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span>parentName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">&#125;</span>
		
		<span class="token keyword">return</span> f<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,z,f,T,Y,C,E,x,Z,D,b,Ss=`<code class="language-java"><span class="token keyword">package</span> <span class="token namespace">windows</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Frame</span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> title <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> width <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> height <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Section</span><span class="token punctuation">></span></span> sections <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Section</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">Frame</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token keyword">int</span> width<span class="token punctuation">,</span> <span class="token keyword">int</span> height<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> width<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addSection</span><span class="token punctuation">(</span><span class="token class-name">Section</span> s<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token class-name">String</span> program <span class="token operator">=</span> <span class="token string">"import javax.swing.JFrame;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"import javax.swing.JLabel;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"import javax.swing.JButton;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"import javax.swing.SwingUtilities;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"import java.awt.FlowLayout;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"public class FrameApplication &#123;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"public static void main(String[] args) &#123;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"SwingUtilities.invokeLater(new Runnable() &#123;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"public void run() &#123;&#92;r&#92;n"</span><span class="token punctuation">;</span>
		
		program <span class="token operator">+=</span> <span class="token string">"JFrame "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">" = new JFrame()&#92;r&#92;n"</span><span class="token punctuation">;</span>
		program <span class="token operator">+=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">".setLayout(new FlowLayout());&#92;r&#92;n"</span><span class="token punctuation">;</span>
		program <span class="token operator">+=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">".setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);&#92;r&#92;n"</span><span class="token punctuation">;</span>
		program <span class="token operator">+=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">".setTitle("</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">");&#92;r&#92;n"</span><span class="token punctuation">;</span>
		program <span class="token operator">+=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">".setSize("</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">+</span> <span class="token string">", "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">+</span> <span class="token string">");&#92;r&#92;n"</span><span class="token punctuation">;</span>
		
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Section</span> s <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
			program <span class="token operator">+=</span> s<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">&#125;</span>
		
		program <span class="token operator">+=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">".setVisible(true);&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"&#125;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"&#125;);&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"&#125;&#92;r&#92;n"</span>
				<span class="token operator">+</span> <span class="token string">"&#125;"</span><span class="token punctuation">;</span>
		
		<span class="token keyword">return</span> program<span class="token punctuation">;</span>
		
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,U,j,P,$,q,S,hs=`<code class="language-java"><span class="token keyword">package</span> <span class="token namespace">windows</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Section</span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> sectionId <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span> 
	<span class="token keyword">public</span> <span class="token class-name">String</span> label<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> button<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> parentName<span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Section</span><span class="token punctuation">></span></span> sections <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Section</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">Section</span><span class="token punctuation">(</span><span class="token class-name">String</span> label<span class="token punctuation">,</span> <span class="token class-name">String</span> button<span class="token punctuation">,</span> <span class="token class-name">String</span> parentName<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>sectionId<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>parentName <span class="token operator">=</span> parentName<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>label <span class="token operator">=</span> label<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>button <span class="token operator">=</span> button<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addSection</span><span class="token punctuation">(</span><span class="token class-name">Section</span> s<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token class-name">String</span> program <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
		
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>label <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
			<span class="token class-name">String</span> labelName <span class="token operator">=</span> <span class="token string">"label"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parentName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">;</span>
	
			program <span class="token operator">+=</span> <span class="token string">"JLabel "</span> <span class="token operator">+</span> labelName <span class="token operator">+</span> <span class="token string">" = new JLabel();&#92;r&#92;n"</span>
			 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parentName <span class="token operator">+</span> <span class="token string">".add("</span> <span class="token operator">+</span> labelName <span class="token operator">+</span> <span class="token string">");&#92;r&#92;n"</span>
			<span class="token operator">+</span> labelName <span class="token operator">+</span> <span class="token string">".setText(""</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>label <span class="token operator">+</span> <span class="token string">"");&#92;r&#92;n"</span><span class="token punctuation">;</span>
		<span class="token punctuation">&#125;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
			<span class="token class-name">String</span> buttonName <span class="token operator">=</span> <span class="token string">"button"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parentName <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">;</span>
	
			program <span class="token operator">+=</span> <span class="token string">"JButton "</span> <span class="token operator">+</span> buttonName <span class="token operator">+</span> <span class="token string">" = new JButton();&#92;r&#92;n"</span>
			 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parentName <span class="token operator">+</span> <span class="token string">".add("</span> <span class="token operator">+</span> buttonName <span class="token operator">+</span> <span class="token string">");&#92;r&#92;n"</span>
			<span class="token operator">+</span> buttonName <span class="token operator">+</span> <span class="token string">".setText(""</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>button <span class="token operator">+</span> <span class="token string">"");&#92;r&#92;n"</span><span class="token punctuation">;</span>
		<span class="token punctuation">&#125;</span>
		
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Section</span> s <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sections<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
			program <span class="token operator">+=</span> s<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">&#125;</span>
		
		<span class="token keyword">return</span> program<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`;return{c(){i=t("h2"),h=t("a"),V=r("Api use"),R=l(),v=t("p"),L=t("strong"),W=r("Main"),J=l(),m=t("pre"),H=l(),w=t("h2"),B=t("a"),X=r("Builders"),O=l(),_=t("p"),N=t("strong"),K=r("Frame builder"),M=l(),y=t("pre"),G=l(),F=t("p"),A=t("strong"),Q=r("Section builder"),I=l(),g=t("pre"),z=l(),f=t("h2"),T=t("a"),Y=r("Generators objects"),C=l(),E=t("p"),x=t("strong"),Z=r("Frame"),D=l(),b=t("pre"),U=l(),j=t("p"),P=t("strong"),$=r("Section"),q=l(),S=t("pre"),this.h()},l(s){i=o(s,"H2",{id:!0});var a=e(i);h=o(a,"A",{href:!0});var ns=e(h);V=d(ns,"Api use"),ns.forEach(n),a.forEach(n),R=k(s),v=o(s,"P",{});var as=e(v);L=o(as,"STRONG",{});var ps=e(L);W=d(ps,"Main"),ps.forEach(n),as.forEach(n),J=k(s),m=o(s,"PRE",{class:!0});var vs=e(m);vs.forEach(n),H=k(s),w=o(s,"H2",{id:!0});var ts=e(w);B=o(ts,"A",{href:!0});var os=e(B);X=d(os,"Builders"),os.forEach(n),ts.forEach(n),O=k(s),_=o(s,"P",{});var es=e(_);N=o(es,"STRONG",{});var cs=e(N);K=d(cs,"Frame builder"),cs.forEach(n),es.forEach(n),M=k(s),y=o(s,"PRE",{class:!0});var Bs=e(y);Bs.forEach(n),G=k(s),F=o(s,"P",{});var ls=e(F);A=o(ls,"STRONG",{});var ks=e(A);Q=d(ks,"Section builder"),ks.forEach(n),ls.forEach(n),I=k(s),g=o(s,"PRE",{class:!0});var _s=e(g);_s.forEach(n),z=k(s),f=o(s,"H2",{id:!0});var us=e(f);T=o(us,"A",{href:!0});var is=e(T);Y=d(is,"Generators objects"),is.forEach(n),us.forEach(n),C=k(s),E=o(s,"P",{});var rs=e(E);x=o(rs,"STRONG",{});var ds=e(x);Z=d(ds,"Frame"),ds.forEach(n),rs.forEach(n),D=k(s),b=o(s,"PRE",{class:!0});var Fs=e(b);Fs.forEach(n),U=k(s),j=o(s,"P",{});var ms=e(j);P=o(ms,"STRONG",{});var ws=e(P);$=d(ws,"Section"),ws.forEach(n),ms.forEach(n),q=k(s),S=o(s,"PRE",{class:!0});var Ts=e(S);Ts.forEach(n),this.h()},h(){u(h,"href","#api-use"),u(i,"id","api-use"),u(m,"class","language-java"),u(B,"href","#builders"),u(w,"id","builders"),u(y,"class","language-java"),u(g,"class","language-java"),u(T,"href","#generators-objects"),u(f,"id","generators-objects"),u(b,"class","language-java"),u(S,"class","language-java")},m(s,a){p(s,i,a),c(i,h),c(h,V),p(s,R,a),p(s,v,a),c(v,L),c(L,W),p(s,J,a),p(s,m,a),m.innerHTML=gs,p(s,H,a),p(s,w,a),c(w,B),c(B,X),p(s,O,a),p(s,_,a),c(_,N),c(N,K),p(s,M,a),p(s,y,a),y.innerHTML=fs,p(s,G,a),p(s,F,a),c(F,A),c(A,Q),p(s,I,a),p(s,g,a),g.innerHTML=bs,p(s,z,a),p(s,f,a),c(f,T),c(T,Y),p(s,C,a),p(s,E,a),c(E,x),c(x,Z),p(s,D,a),p(s,b,a),b.innerHTML=Ss,p(s,U,a),p(s,j,a),c(j,P),c(P,$),p(s,q,a),p(s,S,a),S.innerHTML=hs},p:ss,i:ss,o:ss,d(s){s&&n(i),s&&n(R),s&&n(v),s&&n(J),s&&n(m),s&&n(H),s&&n(w),s&&n(O),s&&n(_),s&&n(M),s&&n(y),s&&n(G),s&&n(F),s&&n(I),s&&n(g),s&&n(z),s&&n(f),s&&n(C),s&&n(E),s&&n(D),s&&n(b),s&&n(U),s&&n(j),s&&n(q),s&&n(S)}}}const xs={title:"Fluent apis",short:"Design pattern used in software development to create an interface for configuring an object in a clear and concise way, often using a chain of method calls to build up a complex configuration.",topic:"computer-science fluent-api java"};class Ps extends Es{constructor(i){super(),js(this,i,null,Ns,Ls,{})}}export{Ps as default,xs as metadata};
