using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;
using WebstoreAPI.Models;
using WebstoreAPI.Services;

namespace WebstoreAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebstoreAPI", Version = "v1" });
            });

            services.Configure<ClothesDatabaseSettings>(
                Configuration.GetSection(nameof(ClothesDatabaseSettings))
            );

            services.AddSingleton<IClothesDatabaseSettings>(
                sp => sp.GetRequiredService<IOptions<ClothesDatabaseSettings>>().Value
            );

            services.AddSingleton<ClothesService>();

            services.AddCors(
                options =>
                {
                    options.AddPolicy("AllowAny",
                        builder => builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                    );
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebstoreAPI v1"));
            }

            app.UseCors("AllowAny");
            
            // Todo legg til defaultfilesoption, useDefaultfiles, usestaticfiles
            
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
